from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import List
import chromadb
from chromadb.config import Settings
import PyPDF2
import docx
import anthropic
from io import BytesIO

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ChromaDB
chroma_client = chromadb.Client(Settings(
    anonymized_telemetry=False,
    is_persistent=False
))

# Store collections per session
collections = {}

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class Question(BaseModel):
    question: str
    session_id: str

class UploadResponse(BaseModel):
    message: str
    session_id: str
    chunks_created: int

def extract_text_from_pdf(file_bytes):
    """Extract text from PDF file"""
    pdf_reader = PyPDF2.PdfReader(BytesIO(file_bytes))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(file_bytes):
    """Extract text from DOCX file"""
    doc = docx.Document(BytesIO(file_bytes))
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def extract_text_from_txt(file_bytes):
    """Extract text from TXT file"""
    return file_bytes.decode('utf-8')

def chunk_text(text, chunk_size=1000, overlap=200):
    """Split text into overlapping chunks"""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk)
        start += chunk_size - overlap
    return chunks

@app.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """Upload and process a document"""
    try:
        # Read file content
        content = await file.read()
        
        # Extract text based on file type
        filename = file.filename.lower()
        if filename.endswith('.pdf'):
            text = extract_text_from_pdf(content)
        elif filename.endswith('.docx'):
            text = extract_text_from_docx(content)
        elif filename.endswith('.txt'):
            text = extract_text_from_txt(content)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Use PDF, DOCX, or TXT")
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No text could be extracted from the document")
        
        # Chunk the text
        chunks = chunk_text(text)
        
        # Create a unique session ID
        session_id = f"session_{len(collections)}"
        
        # Create a new ChromaDB collection for this session
        collection = chroma_client.create_collection(name=session_id)
        
        # Add chunks to collection
        collection.add(
            documents=chunks,
            ids=[f"chunk_{i}" for i in range(len(chunks))]
        )
        
        # Store collection reference
        collections[session_id] = collection
        
        return UploadResponse(
            message="Document uploaded and processed successfully",
            session_id=session_id,
            chunks_created=len(chunks)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
async def ask_question(question_data: Question):
    """Ask a question about the uploaded document"""
    try:
        session_id = question_data.session_id
        question = question_data.question
        
        # Get the collection for this session
        if session_id not in collections:
            raise HTTPException(status_code=404, detail="Session not found. Please upload a document first.")
        
        collection = collections[session_id]
        
        # Query the collection for relevant chunks
        results = collection.query(
            query_texts=[question],
            n_results=3
        )
        
        # Get relevant context
        context = "\n\n".join(results['documents'][0])
        
        # Create prompt for Claude
        prompt = f"""Based on the following context from a document, please answer the question.

Context:
{context}

Question: {question}

Please provide a clear and concise answer based solely on the information in the context. If the answer cannot be found in the context, please say so."""
        
        # Get response from Claude
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        answer = message.content[0].text
        
        return {
            "answer": answer,
            "sources": results['documents'][0]
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/session/{session_id}")
async def delete_session(session_id: str):
    """Delete a session and its associated document data"""
    try:
        if session_id in collections:
            chroma_client.delete_collection(name=session_id)
            del collections[session_id]
            return {"message": "Session deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Session not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)