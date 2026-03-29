import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const StructuredMessage = ({ content }) => {
  if (!content.includes('🐾 Summary:') && !content.includes('📌 Possible Reasons:') && !content.includes('💡 What You Can Do:') && !content.includes('🚨 When to See a Vet:')) {
    return <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>;
  }

  const sections = content.split(/(?=🐾 Summary:|📌 Possible Reasons:|💡 What You Can Do:|🚨 When to See a Vet:)/g).filter(s => s.trim());

  return (
    <div className="structured-response">
      {sections.map((sec, idx) => {
        const lines = sec.trim().split('\n').filter(line => line.trim());
        const title = lines[0];
        const contentLines = lines.slice(1);

        let colorClass = 'sec-default';
        if (title.includes('Summary')) colorClass = 'sec-summary';
        else if (title.includes('Possible Reasons')) colorClass = 'sec-reasons';
        else if (title.includes('What You Can Do')) colorClass = 'sec-actions';
        else if (title.includes('When to See a Vet')) colorClass = 'sec-warning';

        return (
          <div key={idx} className={`ai-section-card ${colorClass}`}>
            <h4 className="ai-section-title">{title}</h4>
            {contentLines.length > 0 && (
              <ul className="ai-section-list">
                {contentLines.map((item, i) => (
                  <li key={i}>{item.replace(/^-\s*/, '').trim()}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

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
        {
          role: 'system',
          content: 'You are a PetCare AI Assistant. You MUST format every response EXACTLY like this with no extra text:\n\n🐾 Summary:\n- [Short answer]\n\n📌 Possible Reasons:\n- [Point 1]\n- [Point 2]\n\n💡 What You Can Do:\n- [Action 1]\n- [Action 2]\n\n🚨 When to See a Vet:\n- [Warning signs]\n\nOmit sections if they truly do not apply, but ALWAYS use these exact headers including the emojis.'
        },
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
          <div key={index} className={`chat-bubble ${msg.role} ${msg.role === 'ai' && msg.content.includes('🐾') ? 'structured-bubble' : ''}`}>
            {msg.role === 'ai' ? <StructuredMessage content={msg.content} /> : msg.content}
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
