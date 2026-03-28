import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! 🐾 I am your PetCare AI Assistant. How can I help you and your furry friend today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create a message history suitable for Groq API
      const apiMessages = [
        { role: 'system', content: 'You are a helpful and friendly PetCare AI Assistant. Your goal is to help pet owners with advice about their pets, such as diet, behavior, general health questions, and training. You are polite, knowledgeable, and empathetic.' },
        ...messages.map(msg => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: msg.content
        })),
        { role: 'user', content: userMsg.content }
      ];

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();
      const aiResponseContent = data.reply || "Sorry, I couldn't understand that.";

      setMessages(prev => [...prev, { role: 'ai', content: aiResponseContent }]);
    } catch (error) {
      console.error("Error communicating with AI API:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Oops! Something went wrong while connecting to the AI. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span role="img" aria-label="paw">🐾</span>
        PetCare AI Assistant
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="typing-indicator">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chatbot-input"
          placeholder="Ask about pet care..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="chatbot-send-btn"
          disabled={!inputMessage.trim() || isLoading}
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
