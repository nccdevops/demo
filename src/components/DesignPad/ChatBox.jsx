
// src/components/DesignPad/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import './styles/ChatBox.css';

export const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContentRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessages = [
      ...messages,
      { text: input, type: 'user' },
      { text: 'Message received!', type: 'ai' }
    ];
    
    setMessages(newMessages);
    setInput('');
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">Chat Assistant</div>
        <div className="chat-content" ref={chatContentRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`${msg.type}-message`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
