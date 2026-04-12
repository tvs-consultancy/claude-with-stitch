import { useState, useRef, useEffect } from 'react';
import {
  type ChatMessage,
  type Conversation,
  mockConversations,
  assistantResponses,
} from '../data/mock-data';
import Icon from '../components/Icon';

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
      <aside className="h-full w-72 bg-white flex flex-col py-8 px-4 shadow-xl shadow-slate-200/50 z-10 overflow-y-auto shrink-0">
        <button
          onClick={handleNewConversation}
          className="mb-8 w-full py-3 px-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Icon name="add" size="sm" />
          <span className="text-sm">New Conversation</span>
        </button>

        <nav className="flex-1 space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`group w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-left ${
                conv.id === activeConvId
                  ? 'text-blue-700 border-r-4 border-blue-600 bg-slate-50'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Icon name={conv.id === activeConvId ? 'bar_chart' : 'chat_bubble_outline'} size="sm" />
              <div className="min-w-0 flex-1">
                <span className={`text-sm block truncate ${conv.id === activeConvId ? 'font-bold' : 'font-medium'}`}>
                  {conv.title}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {conv.createdAt} · {conv.messages.length} messages
                </span>
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="text-sm font-bold text-on-surface">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">User</span>
              <span className="text-[10px] text-slate-400 font-medium">Media Planner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative h-full">
        {/* Header */}
        <header className="w-full sticky top-0 bg-slate-50 flex justify-between items-center px-8 py-4 z-10 border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold tracking-tight text-on-surface">
              {activeConv?.title ?? 'Select a conversation'}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span className="text-on-surface-variant">{activeConv?.messages.length ?? 0} messages</span>
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto px-8 py-12 space-y-12 bg-surface">
          {activeConv?.messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="smart_toy" filled size="xl" className="text-primary-container" />
                </div>
                <p className="font-bold text-on-surface text-lg">Start the conversation</p>
                <p className="text-sm text-on-surface-variant mt-1.5 max-w-xs">
                  Ask about media planning strategies, budget allocation, or campaign optimization
                </p>
              </div>
            </div>
          )}

          {activeConv?.messages.map((msg) =>
            msg.role === 'assistant' ? (
              <div key={msg.id} className="flex flex-col items-start max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white">
                    <Icon name="smart_toy" filled size="sm" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Media Curator
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl rounded-tl-none border border-outline-variant/10 shadow-[0_32px_64px_-4px_rgba(25,28,30,0.04)]">
                  <p className="text-on-surface leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="mt-2 text-[10px] font-medium text-slate-400 ml-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ) : (
              <div key={msg.id} className="flex flex-col items-end max-w-3xl ml-auto">
                <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="text-xs font-bold text-on-surface">JD</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">You</span>
                </div>
                <div className="bg-primary text-white p-6 rounded-xl rounded-tr-none shadow-lg shadow-primary/10">
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="mt-2 text-[10px] font-medium text-slate-400 mr-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="w-full p-6 glass-header bg-white/80 border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto flex items-center gap-4 bg-surface-container-low rounded-2xl p-2 pr-4 ring-1 ring-inset ring-outline-variant/20 focus-within:ring-primary/50 transition-all">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <Icon name="attach_file" />
            </button>
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-slate-400"
              placeholder="Ask about media planning..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            />
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <Icon name="mic" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <Icon name="send" size="sm" />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium tracking-wide">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </main>
    </div>
  );
}
