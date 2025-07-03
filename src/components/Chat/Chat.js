'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

function Chat({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const bubbleBgClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800';
  const chatWindowBgClass = theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
  const chatHeaderBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-blue-600';
  const chatHeaderTextColor = theme === 'dark' ? 'text-white' : 'text-white';
  const messageBgBot = theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800';
  const messageBgUser = theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white';
  const inputBgClass = theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900';
  const inputBorderClass = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const sendButtonClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800';

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage = { id: Date.now(), text: newMessage.trim(), sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, text: "Thanks for your message! We'll get back to you shortly.", sender: "bot" };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  }, [newMessage]);

  useEffect(() => {
    // Scroll to the bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50"> {/* Changed from left-4 to right-4 */}
      {isOpen && (
        <div
          className={`relative w-72 h-96 flex flex-col rounded-lg shadow-xl mb-4 transition-all duration-300 ease-in-out transform origin-bottom-right
            ${chatWindowBgClass} border`} // Changed origin-bottom-left to origin-bottom-right
          style={{ transform: isOpen ? 'scale(1)' : 'scale(0.8)', opacity: isOpen ? 1 : 0 }}
        >
          {/* Chat Header */}
          <div className={`flex justify-between items-center p-3 rounded-t-lg ${chatHeaderBgClass} ${chatHeaderTextColor}`}>
            <h4 className="font-semibold text-lg">Chat Support</h4>
            <button
              onClick={toggleChat}
              className={`p-1 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-white hover:bg-blue-800'}`}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto custom-scrollbar" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? messageBgUser : messageBgBot}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className={`flex-1 p-2 rounded-md border ${inputBorderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className={`p-2 rounded-md transition-colors duration-200 ${sendButtonClass} text-white`}
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75
          ${bubbleBgClass} text-white`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}

export default Chat;