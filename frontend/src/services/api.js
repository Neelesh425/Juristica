const API_BASE_URL = 'http://localhost:8000';

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Upload failed');
  }

  return response.json();
};

export const askQuestion = async (question, sessionId) => {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Question failed');
  }

  return response.json();
};

export const deleteSession = async (sessionId) => {
  const response = await fetch(`${API_BASE_URL}/session/${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Delete failed');
  }

  return response.json();
};