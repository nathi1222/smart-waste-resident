import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ChatSupportScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  read: boolean;
}

const ChatSupportScreen: React.FC<ChatSupportScreenProps> = ({ onBack }) => {
  const { t, formatCurrency } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to SMART WASTE support. How can I help you today?',
      sender: 'support',
      timestamp: new Date(),
      read: true,
    },
    {
      id: '2',
      text: 'You can ask about collections, billing, or report any issues.',
      sender: 'support',
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate support response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let responseText = '';
        const userMessage = inputText.toLowerCase();
        
        if (userMessage.includes('collection') || userMessage.includes('bin')) {
          responseText = 'Your next collection is on Tuesday, April 15th from 8:00 AM to 12:00 PM. Would you like me to set a reminder?';
        } else if (userMessage.includes('bill') || userMessage.includes('payment') || userMessage.includes('cost')) {
          responseText = `Your current monthly service fee is ${formatCurrency(85.00)}. This includes general waste, recycling, and garden waste collection.`;
        } else if (userMessage.includes('report') || userMessage.includes('issue')) {
          responseText = 'I can help you report an issue. Please describe the problem and your address, and I\'ll create a ticket for you.';
        } else if (userMessage.includes('new bin') || userMessage.includes('request')) {
          responseText = 'You can request a new bin through the "Request Bin" option in the dashboard. Would you like me to take you there?';
        } else {
          responseText = 'Thank you for your message. One of our support agents will get back to you shortly. In the meantime, feel free to check our FAQ section.';
        }
        
        const supportResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'support',
          timestamp: new Date(),
          read: false,
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white text-2xl p-1">←</button>
          <div>
            <h1 className="text-white text-xl font-semibold">{t('chat.title')}</h1>
            <p className="text-green-200 text-xs mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {t('chat.online')} • {t('chat.customerSupport')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className={`text-xs ${message.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                  {formatTime(message.timestamp)}
                </span>
                {message.sender === 'user' && (
                  <span className="text-xs text-green-200">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Suggestions */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Collection schedule', 'Billing question', 'Report issue', 'Request bin'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputText(suggestion)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap hover:border-green-500 hover:text-green-600 transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-green-600 transition">
            📎
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.typeMessage')}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="bg-green-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupportScreen;