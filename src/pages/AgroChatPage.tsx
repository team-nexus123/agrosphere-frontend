import React, { useState } from 'react';
import Layout from '../components/Layout';

// Define the message types
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

/**
 * A dedicated page for the AI Farming Advisor Chat Interface.
 */
const AgroChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I am AgroBot. I can help with crop recommendations, disease advice, and general farming guidance. How can I help you today?",
      sender: 'ai',
    },
    {
      id: 2,
      text: "Remember, you can also use your voice or a Nigerian language!",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };

    setMessages([...messages, newUserMessage]);
    setInput('');

    // Simulate an AI response after a short delay
    setTimeout(() => {
      const newAiMessage: Message = {
        id: messages.length + 2,
        text: `Based on your question: "${input}", I recommend you check your soil moisture. If you need an expert, visit the Experts tab.`,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
          message.sender === 'user'
            ? 'bg-green-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {message.text}
      </div>
    </div>
  );

  return (
    <Layout>
      {/* 1. Header with Back Button */}
      <header className="flex items-center p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <button aria-label="Back" className="text-xl mr-3">
          {'<'} {/* Simple back arrow */}
        </button>
        <h1 className="text-lg font-semibold">Agro-Chat Advisor 🤖</h1>
      </header>

      {/* 2. Message History Area */}
      <main className="flex-1 p-4 overflow-y-auto space-y-4 h-[calc(100vh-140px)]"> 
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {/* Placeholder for scrolling to the latest message */}
        <div className="h-4" /> 
      </main>

      {/* 3. Input Bar (Text and Voice) */}
      <div className="p-3 bg-white border-t border-gray-200 sticky bottom-0 z-10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your crops, soil, or planning..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSendMessage}
            aria-label="Send Message"
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={input.trim() === ''}
          >
            {/* Send Icon Placeholder */}
            <span>➡️</span>
          </button>
          <button
            aria-label="Voice Note"
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            {/* Microphone/Voice Note Icon Placeholder */}
            <span>🎤</span> 
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">Voice notes and Nigerian language support available.</p>
      </div>
    </Layout>
  );
};

export default AgroChatPage;