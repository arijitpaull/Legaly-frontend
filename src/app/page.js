"use client";

import Header from '../app/Header';
import Footer from '../app/Footer';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === '') {
     
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/chat`, { prompt: input });
      const botMessage = { role: 'assistant', content: response.data };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] overflow-hidden">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#101010] overflow-hidden">
       
        {messages.length === 0 && (
          <h2 className="text-white text-7xl mb-4 font-black">Ask Legaly.</h2>
        )}
        <div className="bg-[#F0F0F0] p-8 rounded-custom shadow-md w-full max-w-lg overflow-hidden">
         
          {messages.length > 0 && (
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto p-4 border border-gray-300 rounded-custom bg-[#A0A0A0]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                >
            
                  <div className={`text-[#101010] text-[0.9rem] font-black mb-1 ${msg.role === 'user' ? 'pr-2.5' : 'pl-2.5'}`}>
                    {msg.role === 'user' ? 'You' : 'Legaly'}
                  </div>
                 
                  <div
                    className={`p-3 rounded-custom ${msg.role === 'user' ? 'bg-[#505050] text-white' : 'bg-[#202020] text-white'}`}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex mt-4 space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border border-[#a0a0a0] rounded-custom bg-[#A0A0A0] text-white placeholder-[#707070] focus:outline-none focus:ring-2 focus:ring-[#101010]"
              placeholder="State your legal query."
            />
            <button
              type="submit"
              className="bg-[#101010] text-white px-4 py-2 rounded-custom border-transparent hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-[#101010]"
            >
              Send 
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
