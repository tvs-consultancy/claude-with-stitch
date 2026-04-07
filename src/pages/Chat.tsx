import { useState, useRef, useEffect } from 'react';
import {
  type ChatMessage,
  type Conversation,
  mockConversations,
  assistantResponses,
} from '../data/mock-data';

let nextMsgId = 100;

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConvId, setActiveConvId] = useState<string>(mockConversations[0].id);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages.length]);

  function handleSend() {
    if (!input.trim() || !activeConv) return;

    const userMsg: ChatMessage = {
      id: String(nextMsgId++),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const responseText = assistantResponses[Math.floor(Math.random() * assistantResponses.length)];
    const assistantMsg: ChatMessage = {
      id: String(nextMsgId++),
      role: 'assistant',
      content: responseText,
      timestamp: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, messages: [...c.messages, userMsg, assistantMsg] }
          : c
      )
    );
    setInput('');
  }

  function handleNewConversation() {
    const newConv: Conversation = {
      id: String(Date.now()),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newConv.id);
  }

  return (
    <div className="flex h-full">
      {/* Conversation Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={handleNewConversation}
            className="w-full py-2.5 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            + New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-colors ${
                conv.id === activeConvId
                  ? 'bg-primary/5 border-l-2 border-l-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              <p className={`text-sm font-medium truncate ${conv.id === activeConvId ? 'text-primary' : 'text-gray-900'}`}>
                {conv.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{conv.createdAt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">{activeConv?.title ?? 'Select a conversation'}</h2>
          <p className="text-xs text-gray-400">{activeConv?.messages.length ?? 0} messages</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface">
          {activeConv?.messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <p className="text-4xl mb-3">💬</p>
                <p className="font-medium">Start the conversation</p>
                <p className="text-sm mt-1">Ask about media planning strategies</p>
              </div>
            </div>
          )}
          {activeConv?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about media planning..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
