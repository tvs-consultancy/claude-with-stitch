import { useState } from 'react';
import { mockConversations, assistantResponses } from '../data/mock-data';
import type { Conversation, ChatMessage } from '../data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '../components/Icon';
import EmptyState from '../components/EmptyState';

const sidebarConversations = [
  { id: '1', title: 'Q2 Digital Strategy Review', date: 'Today' },
  { id: '2', title: 'Voss Campaign Budget Analysis', date: 'Yesterday' },
  { id: '3', title: 'Cross-Channel Attribution Model', date: 'Oct 24' },
  { id: '4', title: 'Hale Brand Refresh Brief', date: 'Oct 22' },
  { id: '5', title: 'Global Paid Search Audit', date: 'Oct 19' },
  { id: '6', title: 'Holiday Season Reach Forecast', date: 'Oct 15' },
  { id: '7', title: 'Competitive Media Spend Q1', date: 'Oct 12' },
  { id: '8', title: 'Retail Media Network Strategy', date: 'Oct 08' },
] as const;

export default function Chat() {
  const [activeConvId, setActiveConvId] = useState('1');
  const [conversations, setConversations] = useState<readonly Conversation[]>(mockConversations);
  const [input, setInput] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const sidebarEntry = sidebarConversations.find((c) => c.id === activeConvId);
  const headerTitle = activeConversation?.title ?? sidebarEntry?.title ?? 'Conversation';
  const messageCount = activeConversation?.messages.length ?? 0;

  function handleSend() {
    if (!input.trim() || !activeConversation) return;

    const userMsg: ChatMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const aiMsg: ChatMessage = {
      id: `${Date.now()}-a`,
      role: 'assistant',
      content: assistantResponses[Math.floor(Math.random() * assistantResponses.length)],
      timestamp: new Date().toISOString(),
    };

    setConversations(
      conversations.map((c) =>
        c.id === activeConvId
          ? { ...c, messages: [...c.messages, userMsg, aiMsg] }
          : c
      )
    );
    setInput('');
  }

  function formatTime(ts: string): string {
    return new Date(ts).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  return (
    <div className="flex h-screen">
      {/* Conversation Sidebar */}
      <aside className="w-[280px] h-full bg-white border-r border-zinc-border/50 flex flex-col shrink-0">
        <div className="p-6">
          <Button className="w-full h-11 corsair-gradient text-white hover:brightness-110">
            <Icon name="add" size="sm" />
            <span className="text-sm font-semibold">New Conversation</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-2">
            {sidebarConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full text-left px-4 py-3 mb-1 border-l-[3px] transition-colors cursor-pointer ${
                  conv.id === activeConvId
                    ? 'bg-corsair-wash border-corsair'
                    : 'border-transparent hover:bg-surface-container-low'
                }`}
              >
                <p
                  className={`text-sm truncate ${
                    conv.id === activeConvId
                      ? 'font-semibold text-corsair'
                      : 'font-medium text-deep-ink'
                  }`}
                >
                  {conv.title}
                </p>
                <p className="text-[10px] metric-lock text-muted-zinc mt-1 uppercase">
                  {conv.date}
                </p>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Canvas */}
      <main className="flex-1 flex flex-col h-full relative bg-canvas-fog">
        {/* Top App Bar */}
        <header className="sticky top-0 w-full h-16 bg-white border-b border-zinc-border/50 shadow-sm shadow-black/5 flex justify-between items-center px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-deep-ink">
              {headerTitle}
            </h2>
            <Badge variant="secondary" className="bg-surface-container-low text-mid-zinc border-0 rounded text-[10px] metric-lock h-auto">
              SAVED
            </Badge>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="forum" size="sm" className="text-corsair" />
              <span className="text-sm font-medium text-mid-zinc">
                {messageCount} messages
              </span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full text-mid-zinc hover:bg-surface-container-low">
              <Icon name="more_vert" />
            </Button>
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 max-w-5xl mx-auto w-full">
          {!activeConversation && (
            <EmptyState
              icon="forum"
              title="No messages yet"
              description="This conversation hasn't been started. Pick another from the sidebar, or start a new one."
              padding="lg"
            />
          )}
          {activeConversation?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-3 mb-2 px-1">
                <span className={`text-[10px] metric-lock uppercase tracking-widest ${
                  msg.role === 'user' ? 'text-muted-zinc' : 'text-corsair font-bold'
                }`}>
                  {msg.role === 'user' ? 'Client Lead' : 'Media Architect'}
                </span>
                <span className="text-[10px] metric-lock text-muted-zinc">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div
                className={`p-5 max-w-[85%] shadow-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-corsair text-white rounded-2xl rounded-br-sm'
                    : 'bg-white border border-zinc-border/50 text-deep-ink rounded-2xl rounded-bl-sm'
                }`}
              >
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {/* Spacer for bottom input */}
          <div className="h-32" />
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-canvas-fog via-canvas-fog to-transparent pointer-events-none">
          <div className="max-w-4xl mx-auto flex gap-4 pointer-events-auto">
            <div className="flex-1 relative">
              <input
                className="w-full h-14 bg-white border border-zinc-border/50 rounded-xl pl-6 pr-12 text-sm focus:outline-none focus:border-corsair transition-all shadow-sm"
                placeholder="Type a message or paste a media plan..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Icon name="attach_file" className="text-muted-zinc cursor-pointer hover:text-corsair transition-colors" />
              </div>
            </div>
            <Button
              onClick={handleSend}
              className="h-14 w-14 corsair-gradient text-white hover:brightness-110 shadow-sm rounded-xl"
              size="icon-lg"
            >
              <Icon name="send" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
