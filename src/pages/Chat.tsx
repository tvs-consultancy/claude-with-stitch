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
      <div className="w-[272px] bg-white border-r border-[#e2e8f0] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#e2e8f0]">
          <button
            onClick={handleNewConversation}
            className="w-full py-2.5 px-4 bg-[#2563eb] text-white rounded-xl text-sm font-medium hover:bg-[#1d4ed8] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full text-left px-4 py-3.5 border-b border-[#f1f5f9] transition-colors ${
                conv.id === activeConvId
                  ? 'bg-[#eff6ff] border-l-2 border-l-[#2563eb]'
                  : 'hover:bg-[#f9fafb]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">💬</span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${conv.id === activeConvId ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}>
                    {conv.title}
                  </p>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5">{conv.createdAt} · {conv.messages.length} messages</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-[#e2e8f0]">
          <p className="text-[11px] text-[#94a3b8] text-center">{conversations.length} conversations</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#0f172a]">{activeConv?.title ?? 'Select a conversation'}</h2>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">{activeConv?.messages.length ?? 0} messages</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#f8fafc]">
          {activeConv?.messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💬</span>
                </div>
                <p className="font-semibold text-[#0f172a] text-lg">Start the conversation</p>
                <p className="text-sm text-[#94a3b8] mt-1.5 max-w-xs">Ask about media planning strategies, budget allocation, or campaign optimization</p>
              </div>
            </div>
          )}
          {activeConv?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0 mr-2.5 mt-1">
                  <span className="text-xs">🤖</span>
                </div>
              )}
              <div
                className={`max-w-[65%] px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#2563eb] text-white rounded-2xl rounded-br-md shadow-[0_2px_8px_rgba(37,99,235,0.25)]'
                    : 'bg-white border border-[#e2e8f0] text-[#0f172a] rounded-2xl rounded-bl-md shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-[11px] mt-2 ${msg.role === 'user' ? 'text-white/50' : 'text-[#94a3b8]'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 ml-2.5 mt-1">
                  <span className="text-xs text-white font-bold">U</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-[#e2e8f0]">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about media planning..."
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-colors"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-5 py-3 bg-[#2563eb] text-white rounded-xl text-sm font-medium hover:bg-[#1d4ed8] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_2px_8px_rgba(37,99,235,0.25)] disabled:shadow-none"
            >
              Send
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
