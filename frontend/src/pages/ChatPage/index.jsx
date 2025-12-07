// src/pages/ChatPage.scss

.chat-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .no-document {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #64748b;
    text-align: center;

    svg {
      margin-bottom: 1.5rem;
      opacity: 0.5;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }

    p {
      font-size: 1rem;
    }
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 1.5rem;

    .document-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

      .doc-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: white;

        .doc-icon {
          font-size: 2rem;
        }

        .doc-name {
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0 0 0.25rem;
        }

        .doc-status {
          font-size: 0.875rem;
          opacity: 0.9;
          margin: 0;
        }
      }

      .new-doc-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1.25rem;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .message {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        animation: fadeInUp 0.3s ease-out;

        &.user {
          align-items: flex-end;

          .message-header {
            flex-direction: row-reverse;
          }

          .message-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            max-width: 75%;
            margin-left: auto;
          }
        }

        &.assistant {
          align-items: flex-start;

          .message-content {
            background: #f8fafc;
            color: #1e293b;
            max-width: 85%;
          }
        }

        &.system {
          align-items: center;

          .message-header {
            display: none;
          }

          .message-content {
            background: #ecfdf5;
            color: #065f46;
            border: 1px solid #a7f3d0;
            text-align: center;
            max-width: 90%;
          }
        }

        &.error {
          .message-content {
            background: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
          }
        }

        .message-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            
            &.user-avatar {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            &.assistant-avatar {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }
          }

          .message-label {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
          }
        }

        .message-content {
          padding: 1rem 1.25rem;
          border-radius: 16px;
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .sources {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          max-width: 85%;

          summary {
            cursor: pointer;
            color: #3b82f6;
            font-weight: 500;
            padding: 0.75rem;
            background: #eff6ff;
            border-radius: 8px;
            user-select: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: background 0.2s;

            &:hover {
              background: #dbeafe;
            }
          }

          .sources-list {
            margin-top: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .source-chunk {
            padding: 1rem;
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            border-radius: 6px;

            .source-header {
              font-weight: 600;
              color: #3b82f6;
              margin-bottom: 0.5rem;
              font-size: 0.8125rem;
            }

            p {
              color: #475569;
              font-size: 0.8125rem;
              line-height: 1.5;
              margin: 0;
            }
          }
        }

        .typing-indicator {
          display: flex;
          gap: 0.375rem;
          padding: 0.5rem 0;

          span {
            width: 8px;
            height: 8px;
            background: #94a3b8;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;

            &:nth-child(1) {
              animation-delay: -0.32s;
            }

            &:nth-child(2) {
              animation-delay: -0.16s;
            }
          }
        }
      }
    }

    .question-form {
      display: flex;
      gap: 0.75rem;
      padding: 1rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

      input {
        flex: 1;
        padding: 0.875rem 1.125rem;
        border: 2px solid transparent;
        border-radius: 10px;
        font-size: 1rem;
        background: #f8fafc;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      button {
        padding: 0.875rem 1.25rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}