"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  read?: boolean;
  type?: "text" | "restaurant" | "dish" | "system";
  attachment?: { kind: "restaurant" | "dish"; name: string; emoji: string; href: string };
};

type Thread = {
  id: string;
  user: { name: string; restriction: string; avatar: string; online: boolean; bio: string };
  lastMessage: string;
  lastTime: string;
  unread: number;
  pinned: boolean;
  messages: Message[];
  typing?: boolean;
};

const initialThreads: Thread[] = [
  {
    id: "t1",
    user: { name: "Mike H.", restriction: "Has Celiac", avatar: "https://i.pravatar.cc/80?u=mike", online: true, bio: "Celiac · Manchester · 8 years" },
    lastMessage: "Have you tried the new GF bakery in Camden?",
    lastTime: "2m",
    unread: 2,
    pinned: true,
    messages: [
      { id: "m1_1", from: "them", text: "Hey Sarah! Just saw your post about The Healthy Crust. How was the staff knowledge?", time: "Yesterday, 3:42 PM" },
      { id: "m1_2", from: "me", text: "Amazing! They walked me through every sauce, even brought out a separate menu card. Zero anxiety.", time: "Yesterday, 4:15 PM" },
      { id: "m1_3", from: "them", text: "That's exactly what I needed to hear. I keep telling people but they don't believe me 😂", time: "Yesterday, 4:18 PM" },
      { id: "m1_4", from: "them", text: "Quick question — they also have a sourdough pizza. Is the dough dedicated GF?", time: "Yesterday, 4:20 PM" },
      { id: "m1_5", from: "me", text: "Yes! Separate prep area and oven. They showed me when I asked. Verified it on my review 👌", time: "Yesterday, 4:30 PM" },
      { id: "m1_6", from: "them", text: "Have you tried the new GF bakery in Camden?", time: "2 min ago" },
      { id: "m1_7", from: "them", text: "Trying to plan my Saturday route", time: "1 min ago" },
    ],
  },
  {
    id: "t2",
    user: { name: "Sarah M. (Creator)", restriction: "Has Celiac · ✓ Creator", avatar: "https://i.pravatar.cc/80?u=sarah", online: false, bio: "Celiac Expert · Manchester · 156 reviews" },
    lastMessage: "Thanks for the follow!",
    lastTime: "1h",
    unread: 0,
    pinned: false,
    messages: [
      { id: "m2_1", from: "me", text: "Your Manchester guide saved my trip last month. The dedicated GF pasta list was a goldmine.", time: "Today, 10:12 AM" },
      { id: "m2_2", from: "them", text: "Aww thank you! 💕 I'm so glad it helped.", time: "Today, 10:45 AM" },
      { id: "m2_3", from: "them", text: "Thanks for the follow!", time: "1h ago" },
    ],
  },
  {
    id: "t3",
    user: { name: "Emma T.", restriction: "Has Crohn's", avatar: "https://i.pravatar.cc/80?u=emma", online: true, bio: "Crohn's · Bristol · 5 years" },
    lastMessage: "I'll add that to my list!",
    lastTime: "3h",
    unread: 0,
    pinned: false,
    messages: [
      { id: "m3_1", from: "me", text: "Hey, just saw your comment on my post. Low-FODMAP + GF is a hard combo, but Fresh Bowl's Quinoa Bowl worked for me.", time: "Today, 7:32 AM" },
      { id: "m3_2", from: "them", text: "Oh nice, can you share the link? I always worry about hidden onions/garlic.", time: "Today, 8:00 AM" },
      { id: "m3_3", from: "me", text: "Just tap the dish name in my review — it has the full ingredient list and a 96% safety score.", time: "Today, 8:15 AM" },
      { id: "m3_4", from: "them", text: "I'll add that to my list!", time: "3h ago" },
    ],
  },
  {
    id: "t4",
    user: { name: "The Italian Kitchen", restriction: "Restaurant", avatar: "https://i.pravatar.cc/80?img=12", online: true, bio: "Verified restaurant · Italian · Manchester" },
    lastMessage: "We've added a new GF dessert!",
    lastTime: "1d",
    unread: 0,
    pinned: false,
    messages: [
      { id: "m4_1", from: "them", text: "Hi Sarah! Loved your review of our Pasta Primavera. We've added a new GF dessert — Tiramisu. Would love your feedback when you&apos;re in next.", time: "1d ago" },
      { id: "m4_2", from: "them", text: "We've added a new GF dessert!", time: "1d ago" },
    ],
  },
  {
    id: "t5",
    user: { name: "David L.", restriction: "Has Celiac", avatar: "https://i.pravatar.cc/80?u=david", online: false, bio: "Celiac · London" },
    lastMessage: "Thanks!",
    lastTime: "2d",
    unread: 0,
    pinned: false,
    messages: [
      { id: "m5_1", from: "me", text: "You mentioned you were going to Manchester this weekend. Try Fresh Bowl if you have time — it&apos;s a 96% match for Celiac.", time: "2d ago" },
      { id: "m5_2", from: "them", text: "Thanks!", time: "2d ago" },
    ],
  },
];

const quickReplies = ["Hey! How are you?", "Have you tried ___?", "I'm hosting a meetup next week — interested?", "Sending you my review 🔗"];

export default function MessagesPage() {
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState(threads[0].id);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = threads.find((t) => t.id === activeId);
  const filtered = threads.filter((t) =>
    t.user.name.toLowerCase().includes(search.toLowerCase()) || t.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeId, threads]);

  const handleSend = () => {
    if (!draft.trim() || !active) return;
    const newMsg: Message = { id: `new_${Date.now()}`, from: "me", text: draft, time: "now", read: false };
    setThreads((prev) => prev.map((t) => t.id === active.id ? { ...t, messages: [...t.messages, newMsg], lastMessage: draft, lastTime: "now", unread: 0 } : t));
    setDraft("");
    setShowEmoji(false);

    setTimeout(() => {
      const reply: Message = { id: `reply_${Date.now()}`, from: "them", text: getAutoReply(draft), time: "now" };
      setThreads((prev) => prev.map((t) => t.id === active.id ? { ...t, messages: [...t.messages, reply], lastMessage: reply.text, lastTime: "now" } : t));
    }, 1400);
  };

  const handlePin = (id: string) => {
    setThreads((prev) => prev.map((t) => t.id === id ? { ...t, pinned: !t.pinned } : t));
  };

  const handleArchive = (id: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== id));
    if (activeId === id && threads[0]) setActiveId(threads[0].id);
  };

  const handleMarkUnread = (id: string) => {
    setThreads((prev) => prev.map((t) => t.id === id ? { ...t, unread: 1 } : t));
  };

  const handleAttachRestaurant = (r: { name: string; emoji: string; href: string }) => {
    if (!active) return;
    const attachmentMsg: Message = {
      id: `attach_${Date.now()}`,
      from: "me",
      text: `Shared a restaurant`,
      time: "now",
      type: "restaurant",
      attachment: { kind: "restaurant", name: r.name, emoji: r.emoji, href: r.href },
    };
    setThreads((prev) => prev.map((t) => t.id === active.id ? { ...t, messages: [...t.messages, attachmentMsg], lastMessage: `Shared ${r.name}`, lastTime: "now" } : t));
    setShowAttach(false);
  };

  const filteredMessages = active?.messages.filter((m) => !searchQuery || m.text.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="w-[320px] flex-shrink-0 border-r border-admin-border flex flex-col bg-admin-bg">
        <div className="px-4 py-3 border-b border-admin-border">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[18px] font-semibold text-admin-text">Messages</h1>
            <button
              onClick={() => setShowNewMessage(true)}
              className="text-[12px] px-2 py-1 rounded-md bg-admin-dark text-white hover:opacity-90"
            >
              + New
            </button>
          </div>
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-admin-muted">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-8 pr-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="text-[36px] mb-2">💬</div>
              <p className="text-[13px] text-admin-muted">No conversations match</p>
            </div>
          ) : (
            filtered.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full text-left flex items-start gap-2.5 p-3 border-b border-admin-border transition-colors ${
                  activeId === t.id ? "bg-admin-hover" : "hover:bg-admin-hover"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={t.user.avatar} alt={t.user.name} className="w-11 h-11 rounded-full" />
                  {t.user.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-admin-active-text border-2 border-admin-bg" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {t.pinned && <span className="text-[10px] text-admin-muted">📌</span>}
                    <span className="text-[13.5px] font-semibold text-admin-text truncate flex-1">{t.user.name}</span>
                    <span className="text-[11px] text-admin-muted flex-shrink-0">{t.lastTime}</span>
                  </div>
                  <p className="text-[12.5px] text-admin-muted truncate">{t.lastMessage}</p>
                </div>
                {t.unread > 0 && (
                  <span className="bg-admin-non-text text-white text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-1">{t.unread}</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {active ? (
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-3 border-b border-admin-border flex items-center gap-3">
            <button
              className="md:hidden text-[18px] text-admin-muted"
              onClick={() => setActiveId(threads[0]?.id || "")}
            >
              ←
            </button>
            <img src={active.user.avatar} alt="" className="w-9 h-9 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-admin-text">{active.user.name}</div>
              <div className="text-[11.5px] text-admin-muted">
                {active.user.online ? <span className="text-admin-active-text">● Online now</span> : `Last seen 2h ago`} · {active.user.restriction}
              </div>
            </div>
            <button
              onClick={() => setShowSearch((s) => !s)}
              className="text-admin-muted hover:text-admin-text p-1.5"
              title="Search in conversation"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>
            <button
              onClick={() => setShowInfo(true)}
              className="text-admin-muted hover:text-admin-text p-1.5"
              title="Conversation info"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </button>
          </div>

          {showSearch && (
            <div className="px-5 py-2 border-b border-admin-border bg-admin-hover">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in conversation..."
                className="w-full px-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none"
                autoFocus
              />
            </div>
          )}

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 bg-admin-bg">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[13px] text-admin-muted">No messages match &ldquo;{searchQuery}&rdquo;</p>
              </div>
            ) : (
              <>
                <div className="text-center text-[11px] text-admin-muted mb-3">
                  {active.messages[0] && "Conversation started"}
                </div>
                {filteredMessages.map((m, i) => (
                  <div key={m.id} className={`flex mb-2 ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    {m.from === "them" && (
                      <img src={active.user.avatar} alt="" className="w-7 h-7 rounded-full mr-2 flex-shrink-0 self-end" />
                    )}
                    <div className={`max-w-[70%] ${m.from === "me" ? "items-end" : "items-start"} flex flex-col`}>
                      {m.type === "restaurant" && m.attachment ? (
                        <Link
                          href={m.attachment.href}
                          className="bg-admin-bg border border-admin-border rounded-[12px] p-3 hover:border-admin-dark transition-colors no-underline"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="text-[28px]">{m.attachment.emoji}</div>
                            <div>
                              <div className="text-[13.5px] font-semibold text-admin-text">{m.attachment.name}</div>
                              <div className="text-[11.5px] text-admin-new-text">View restaurant →</div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className={`px-3.5 py-2 rounded-[14px] text-[13.5px] ${
                            m.from === "me" ? "bg-admin-dark text-white" : "bg-admin-hover text-admin-text"
                          }`}
                        >
                          {m.text}
                        </div>
                      )}
                      <span className="text-[10.5px] text-admin-muted mt-0.5 px-1">{m.time}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 mt-2 text-[12px] text-admin-muted">
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-admin-muted rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-admin-muted rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-1.5 h-1.5 bg-admin-muted rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </span>
                  {active.user.name.split(" ")[0]} is typing...
                </div>
              </>
            )}
          </div>

          {showAttach && (
            <div className="border-t border-admin-border bg-admin-bg p-3">
              <div className="text-[12.5px] text-admin-muted mb-2">Share a restaurant</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "The Italian Kitchen", emoji: "🍝", href: "/user/verify?restaurant=r1" },
                  { name: "Fresh Bowl", emoji: "🥗", href: "/user/verify?restaurant=r2" },
                  { name: "Sakura Sushi", emoji: "🍣", href: "/user/verify?restaurant=r3" },
                  { name: "The Vegan Table", emoji: "🥬", href: "/user/verify?restaurant=r4" },
                ].map((r) => (
                  <button
                    key={r.name}
                    onClick={() => handleAttachRestaurant(r)}
                    className="flex items-center gap-2 p-2 rounded-md border border-admin-border text-left hover:bg-admin-hover"
                  >
                    <span className="text-[18px]">{r.emoji}</span>
                    <span className="text-[12.5px] text-admin-text">{r.name}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowAttach(false)} className="text-[12px] text-admin-muted mt-2 hover:underline">Cancel</button>
            </div>
          )}

          <div className="border-t border-admin-border p-3 bg-admin-bg">
            <div className="flex items-center gap-1 mb-1.5 flex-wrap">
              <span className="text-[11px] text-admin-muted">Quick:</span>
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => setDraft(q)}
                  className="text-[11px] px-2 py-0.5 rounded-full border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowAttach((s) => !s)}
                className="text-admin-muted hover:text-admin-text p-2"
                title="Attach restaurant"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
              </button>
              <button
                onClick={() => setShowEmoji((s) => !s)}
                className="text-admin-muted hover:text-admin-text p-2"
                title="Emoji"
              >
                😊
              </button>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none max-h-[100px]"
              />
              <button
                onClick={handleSend}
                disabled={!draft.trim()}
                className="bg-admin-dark text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </div>
            {showEmoji && (
              <div className="mt-2 p-2 border border-admin-border rounded-md">
                <div className="grid grid-cols-8 gap-1">
                  {["😀", "😂", "🥹", "😍", "🤔", "👍", "❤️", "🔥", "🎉", "🍕", "🍔", "🍣", "🥗", "🍰", "🛡️", "✓", "🌟", "💪", "🤝", "☕", "🌱", "🌾", "🥛", "🥜"].map((e) => (
                    <button key={e} onClick={() => { setDraft((d) => d + e); setShowEmoji(false); }} className="text-[20px] p-1 hover:bg-admin-hover rounded">{e}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-admin-muted">
          <div className="text-center">
            <div className="text-[48px] mb-2">💬</div>
            <p className="text-[14px]">Select a conversation</p>
          </div>
        </div>
      )}

      {showInfo && active && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowInfo(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[400px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <img src={active.user.avatar} alt="" className="w-20 h-20 rounded-full mx-auto mb-3" />
              <h3 className="text-[18px] font-semibold text-admin-text">{active.user.name}</h3>
              <p className="text-[12.5px] text-admin-muted">{active.user.bio}</p>
            </div>
            <div className="space-y-2 mb-4">
              <Link href="/user/community" className="block w-full text-center text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">View profile</Link>
              <button onClick={() => { handlePin(active.id); setShowInfo(false); }} className="w-full text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">
                {active.pinned ? "📌 Unpin conversation" : "📌 Pin conversation"}
              </button>
              <button onClick={() => { handleMarkUnread(active.id); setShowInfo(false); }} className="w-full text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">
                Mark as unread
              </button>
              <button onClick={() => { handleArchive(active.id); setShowInfo(false); }} className="w-full text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-non-text hover:bg-admin-non-bg">
                Archive conversation
              </button>
            </div>
            <button onClick={() => setShowInfo(false)} className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Close</button>
          </div>
        </div>
      )}

      {showNewMessage && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowNewMessage(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[420px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-3">New message</h3>
            <input
              type="text"
              placeholder="Search people to message..."
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
            />
            <div className="mt-3 space-y-1.5 max-h-[280px] overflow-y-auto">
              {[
                { name: "Jordan L.", restriction: "Has Celiac", avatar: "https://i.pravatar.cc/80?u=jordan" },
                { name: "Lisa P.", restriction: "Has IBS", avatar: "https://i.pravatar.cc/80?u=lisa" },
                { name: "Tom R.", restriction: "Has Dairy Allergy", avatar: "https://i.pravatar.cc/80?u=tom" },
                { name: "Aisha K.", restriction: "Has Nut Allergy", avatar: "https://i.pravatar.cc/80?u=aisha" },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    const newThread: Thread = {
                      id: `t_${Date.now()}`,
                      user: { ...p, online: false, bio: p.restriction },
                      lastMessage: "",
                      lastTime: "now",
                      unread: 0,
                      pinned: false,
                      messages: [],
                    };
                    setThreads((prev) => [newThread, ...prev]);
                    setActiveId(newThread.id);
                    setShowNewMessage(false);
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-md border border-admin-border hover:bg-admin-hover text-left"
                >
                  <img src={p.avatar} alt="" className="w-9 h-9 rounded-full" />
                  <div>
                    <div className="text-[13.5px] text-admin-text font-medium">{p.name}</div>
                    <div className="text-[11.5px] text-admin-muted">{p.restriction}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowNewMessage(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("thanks") || lower.includes("thank you")) return "You're welcome! 😊";
  if (lower.includes("?") && lower.includes("try")) return "Oh nice, I'll check it out!";
  if (lower.includes("meetup")) return "I'd love to join! When is it?";
  if (lower.includes("?")) return "Hmm, let me think about that...";
  return "Sounds good!";
}
