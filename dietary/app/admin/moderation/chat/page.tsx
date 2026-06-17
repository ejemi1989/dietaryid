"use client";

import { useState } from "react";

type ChatMessage = {
  id: string;
  from: string;
  text: string;
  time: string;
  status: "active" | "flagged" | "banned";
  flaggedReason?: string;
};

type Conversation = {
  id: string;
  userA: { name: string; avatar: string; restriction: string; status: "active" | "warned" | "banned" };
  userB: { name: string; avatar: string; restriction: string; status: "active" | "warned" | "banned" };
  lastMessage: string;
  lastTime: string;
  messageCount: number;
  messages: ChatMessage[];
  flaggedCount: number;
};

const initialConversations: Conversation[] = [
  {
    id: "conv_001",
    userA: { name: "Sarah M.", avatar: "https://i.pravatar.cc/80?u=sarah", restriction: "Has Celiac", status: "active" },
    userB: { name: "Mike H.", avatar: "https://i.pravatar.cc/80?u=mike", restriction: "Has Celiac", status: "active" },
    lastMessage: "Have you tried the new GF bakery in Camden?",
    lastTime: "2 min ago",
    messageCount: 18,
    flaggedCount: 0,
    messages: [
      { id: "msg_001", from: "Mike H.", text: "Hey Sarah! Just saw your post about The Healthy Crust. How was the staff knowledge?", time: "Yesterday, 3:42 PM", status: "active" },
      { id: "msg_002", from: "Sarah M.", text: "Amazing! They walked me through every sauce, even brought out a separate menu card.", time: "Yesterday, 4:15 PM", status: "active" },
      { id: "msg_003", from: "Mike H.", text: "That's exactly what I needed to hear. I keep telling people but they don't believe me", time: "Yesterday, 4:18 PM", status: "active" },
      { id: "msg_004", from: "Mike H.", text: "Have you tried the new GF bakery in Camden?", time: "2 min ago", status: "active" },
    ],
  },
  {
    id: "conv_002",
    userA: { name: "Jordan L.", avatar: "https://i.pravatar.cc/80?u=jordan", restriction: "Has IBS", status: "active" },
    userB: { name: "Emma T.", avatar: "https://i.pravatar.cc/80?u=emma", restriction: "Has Crohn's", status: "active" },
    lastMessage: "This platform is a scam, every restaurant here lies about their ingredients. Don't waste your money!!!",
    lastTime: "5 min ago",
    messageCount: 12,
    flaggedCount: 2,
    messages: [
      { id: "msg_005", from: "Jordan L.", text: "Has anyone had luck finding low-FODMAP in Bristol?", time: "1 hour ago", status: "active" },
      { id: "msg_006", from: "Emma T.", text: "Try Fresh Bowl — they have a quinoa option that's pretty safe", time: "45 min ago", status: "active" },
      { id: "msg_007", from: "Jordan L.", text: "This platform is a scam, every restaurant here lies about their ingredients. Don't waste your money!!!", time: "5 min ago", status: "flagged", flaggedReason: "Auto-flagged: inflammatory language" },
      { id: "msg_008", from: "Jordan L.", text: "I bet the reviewers get paid to say things are safe. It's all fake reviews.", time: "3 min ago", status: "flagged", flaggedReason: "Auto-flagged: unsubstantiated claims" },
    ],
  },
  {
    id: "conv_003",
    userA: { name: "David L.", avatar: "https://i.pravatar.cc/80?u=david", restriction: "Has Celiac", status: "banned" },
    userB: { name: "Sophie T.", avatar: "https://i.pravatar.cc/80?u=sophie", restriction: "Multiple allergies", status: "active" },
    lastMessage: "[Message removed by moderator]",
    lastTime: "1 day ago",
    messageCount: 7,
    flaggedCount: 4,
    messages: [
      { id: "msg_009", from: "David L.", text: "Hey, want to buy some supplements that actually cure your celiac? I'm a distributor.", time: "2 days ago", status: "banned", flaggedReason: "Promoting unverified products" },
      { id: "msg_010", from: "Sophie T.", text: "I'm not interested in supplements, please stop.", time: "2 days ago", status: "active" },
      { id: "msg_011", from: "David L.", text: "Your loss. Enjoy being sick forever eating at these fake 'safe' restaurants", time: "1 day ago", status: "banned", flaggedReason: "Harassment / abusive language" },
      { id: "msg_012", from: "David L.", text: "[Message removed by moderator]", time: "1 day ago", status: "banned", flaggedReason: "Spam / promotional content" },
    ],
  },
  {
    id: "conv_004",
    userA: { name: "Rachel K.", avatar: "https://i.pravatar.cc/80?u=rachel", restriction: "Dairy-Free", status: "active" },
    userB: { name: "Tom B.", avatar: "https://i.pravatar.cc/80?u=tom", restriction: "Nut Allergy", status: "warned" },
    lastMessage: "I understand, sorry about that. Won't happen again.",
    lastTime: "3 hours ago",
    messageCount: 22,
    flaggedCount: 1,
    messages: [
      { id: "msg_013", from: "Rachel K.", text: "Looking for dairy-free spots near Covent Garden", time: "5 hours ago", status: "active" },
      { id: "msg_014", from: "Tom B.", text: "There's a great vegan place on Neal Street. I know the owner personally — I can get you a discount if you mention my name.", time: "4 hours ago", status: "flagged", flaggedReason: "Auto-flagged: potential commercial promotion" },
      { id: "msg_015", from: "Rachel K.", text: "That feels a bit promotional. Just looking for honest recommendations.", time: "4 hours ago", status: "active" },
      { id: "msg_016", from: "Tom B.", text: "I understand, sorry about that. Won't happen again.", time: "3 hours ago", status: "active" },
    ],
  },
  {
    id: "conv_005",
    userA: { name: "Alex N.", avatar: "https://i.pravatar.cc/80?u=alex", restriction: "Has Crohn's", status: "active" },
    userB: { name: "Priya S.", avatar: "https://i.pravatar.cc/80?u=priya", restriction: "Gluten-Free", status: "active" },
    lastMessage: "Thanks for the tips! Really appreciate the detailed breakdown.",
    lastTime: "1 hour ago",
    messageCount: 15,
    flaggedCount: 0,
    messages: [
      { id: "msg_017", from: "Alex N.", text: "Priya! Your London guide saved me so much time. The Borough Market section was gold.", time: "2 hours ago", status: "active" },
      { id: "msg_018", from: "Priya S.", text: "So glad it helped! I'm working on a Bristol edition next — any spots you'd recommend?", time: "1.5 hours ago", status: "active" },
      { id: "msg_019", from: "Alex N.", text: "Yes! I'll send you a list. There's a hidden GF bakery in Clifton that nobody knows about.", time: "1 hour ago", status: "active" },
      { id: "msg_020", from: "Priya S.", text: "Thanks for the tips! Really appreciate the detailed breakdown.", time: "1 hour ago", status: "active" },
    ],
  },
  {
    id: "conv_006",
    userA: { name: "Chris W.", avatar: "https://i.pravatar.cc/80?u=chris", restriction: "Lactose Intolerant", status: "warned" },
    userB: { name: "Nina G.", avatar: "https://i.pravatar.cc/80?u=nina", restriction: "Has IBS", status: "active" },
    lastMessage: "Sorry, I'll keep it respectful.",
    lastTime: "6 hours ago",
    messageCount: 9,
    flaggedCount: 2,
    messages: [
      { id: "msg_021", from: "Chris W.", text: "Nina your review of Pasta Palace is completely wrong. I ate there and it was fine.", time: "8 hours ago", status: "flagged", flaggedReason: "Auto-flagged: hostile tone" },
      { id: "msg_022", from: "Nina G.", text: "Everyone's body is different. I had a bad reaction there. That's valid.", time: "7 hours ago", status: "active" },
      { id: "msg_023", from: "Chris W.", text: "Maybe you're just overly sensitive. Stop scaring people away from good restaurants.", time: "7 hours ago", status: "flagged", flaggedReason: "Auto-flagged: dismissive of dietary condition" },
      { id: "msg_024", from: "Chris W.", text: "Sorry, I'll keep it respectful.", time: "6 hours ago", status: "active" },
    ],
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-admin-active-bg text-admin-active-text",
  flagged: "bg-admin-vip-bg text-admin-vip-text",
  banned: "bg-admin-non-bg text-admin-non-text",
};

const userStatusStyles: Record<string, string> = {
  active: "bg-admin-active-bg text-admin-active-text",
  warned: "bg-admin-vip-bg text-admin-vip-text",
  banned: "bg-admin-non-bg text-admin-non-text",
};

export default function ChatModerationPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [filter, setFilter] = useState<"all" | "active" | "flagged" | "banned">("all");
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [banModal, setBanModal] = useState<{ convId: string; user: string } | null>(null);
  const [warnModal, setWarnModal] = useState<{ convId: string; user: string } | null>(null);
  const [flagReason, setFlagReason] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ convId: string; msgId: string } | null>(null);

  const filtered = conversations.filter((c) => {
    if (filter === "all") return true;
    if (filter === "active") return c.flaggedCount === 0 && c.userA.status !== "banned" && c.userB.status !== "banned";
    if (filter === "flagged") return c.flaggedCount > 0;
    if (filter === "banned") return c.userA.status === "banned" || c.userB.status === "banned";
    return true;
  });

  const totalMessages = conversations.reduce((sum, c) => sum + c.messageCount, 0);
  const totalFlagged = conversations.reduce((sum, c) => sum + c.flaggedCount, 0);
  const bannedUsers = conversations.filter((c) => c.userA.status === "banned" || c.userB.status === "banned").length;

  const handleBanUser = () => {
    if (!banModal) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== banModal.convId) return c;
        const updated = { ...c };
        if (updated.userA.name === banModal.user) updated.userA = { ...updated.userA, status: "banned" as const };
        if (updated.userB.name === banModal.user) updated.userB = { ...updated.userB, status: "banned" as const };
        updated.messages = updated.messages.map((m) =>
          m.from === banModal.user ? { ...m, status: "banned" as const, flaggedReason: "User banned by moderator" } : m
        );
        updated.flaggedCount = updated.messages.filter((m) => m.status !== "active").length;
        return updated;
      })
    );
    setBanModal(null);
  };

  const handleWarnUser = () => {
    if (!warnModal) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== warnModal.convId) return c;
        const updated = { ...c };
        if (updated.userA.name === warnModal.user) updated.userA = { ...updated.userA, status: "warned" as const };
        if (updated.userB.name === warnModal.user) updated.userB = { ...updated.userB, status: "warned" as const };
        return updated;
      })
    );
    setWarnModal(null);
  };

  const handleFlagMessage = (convId: string, msgId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        const updated = { ...c };
        updated.messages = updated.messages.map((m) =>
          m.id === msgId ? { ...m, status: "flagged" as const, flaggedReason: flagReason || "Manually flagged by moderator" } : m
        );
        updated.flaggedCount = updated.messages.filter((m) => m.status !== "active").length;
        return updated;
      })
    );
    setFlagReason("");
  };

  const handleDeleteMessage = () => {
    if (!deleteModal) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== deleteModal.convId) return c;
        const updated = { ...c };
        updated.messages = updated.messages.map((m) =>
          m.id === deleteModal.msgId
            ? { ...m, text: "[Message removed by moderator]", status: "banned" as const, flaggedReason: "Removed by moderator" }
            : m
        );
        updated.flaggedCount = updated.messages.filter((m) => m.status !== "active").length;
        updated.lastMessage = "[Message removed by moderator]";
        return updated;
      })
    );
    setDeleteModal(null);
  };

  const handleApproveMessage = (convId: string, msgId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        const updated = { ...c };
        updated.messages = updated.messages.map((m) =>
          m.id === msgId ? { ...m, status: "active" as const, flaggedReason: undefined } : m
        );
        updated.flaggedCount = updated.messages.filter((m) => m.status !== "active").length;
        return updated;
      })
    );
  };

  const handleUnbanUser = (convId: string, user: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        const updated = { ...c };
        if (updated.userA.name === user) updated.userA = { ...updated.userA, status: "active" as const };
        if (updated.userB.name === user) updated.userB = { ...updated.userB, status: "active" as const };
        updated.messages = updated.messages.map((m) =>
          m.from === user && m.status === "banned" ? { ...m, status: "active" as const, flaggedReason: undefined } : m
        );
        updated.flaggedCount = updated.messages.filter((m) => m.status !== "active").length;
        return updated;
      })
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b border-admin-border px-[26px] py-[18px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[17px] font-semibold text-admin-text">Chat Moderation</h1>
            <p className="text-[12.5px] text-admin-muted mt-0.5">Monitor conversations, flag inappropriate messages, and manage user bans</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 border-b border-admin-border">
        {[
          { label: "Conversations", value: conversations.length },
          { label: "Messages", value: totalMessages },
          { label: "Flagged", value: totalFlagged },
          { label: "Banned Users", value: bannedUsers },
        ].map((s, i) => (
          <div key={s.label} className={`px-[26px] py-3 ${i < 3 ? "border-r border-admin-border" : ""}`}>
            <div className="text-[11.5px] text-admin-muted">{s.label}</div>
            <div className="text-[22px] font-semibold text-admin-text mt-0.5">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="px-[26px] py-3 border-b border-admin-border">
        <div className="flex items-center gap-1">
          {[
            { v: "all", l: "All" },
            { v: "active", l: "Active" },
            { v: "flagged", l: "Flagged" },
            { v: "banned", l: "Banned Users" },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v as typeof filter)}
              className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f.v
                  ? "bg-admin-dark text-white"
                  : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
              }`}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-[26px] py-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 text-center">
              <div className="text-[40px] mb-2">💬</div>
              <p className="text-[14px] text-admin-muted">No conversations match this filter.</p>
            </div>
          ) : (
            filtered.map((conv) => (
              <div key={conv.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex -space-x-1.5">
                      <img src={conv.userA.avatar} alt={conv.userA.name} className="w-8 h-8 rounded-full border-2 border-admin-bg" />
                      <img src={conv.userB.avatar} alt={conv.userB.name} className="w-8 h-8 rounded-full border-2 border-admin-bg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold text-admin-text">
                          {conv.userA.name} ↔ {conv.userB.name}
                        </span>
                        <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${userStatusStyles[conv.userA.status]}`}>
                          {conv.userA.status}
                        </span>
                        <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${userStatusStyles[conv.userB.status]}`}>
                          {conv.userB.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-admin-muted mt-0.5">
                        <span>{conv.userA.restriction}</span>
                        <span>·</span>
                        <span>{conv.userB.restriction}</span>
                        <span>·</span>
                        <span>{conv.messageCount} messages</span>
                        {conv.flaggedCount > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-admin-vip-text font-medium">{conv.flaggedCount} flagged</span>
                          </>
                        )}
                      </div>
                      <p className="text-[13px] text-admin-nav-text mt-1 truncate max-w-[480px]">{conv.lastMessage}</p>
                      <div className="text-[11.5px] text-admin-muted mt-0.5">{conv.lastTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setSelectedConv(selectedConv?.id === conv.id ? null : conv)}
                      className="text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      {selectedConv?.id === conv.id ? "Hide" : "View Chat"}
                    </button>
                    {(conv.userA.status !== "banned" || conv.userB.status !== "banned") && (
                      <button
                        onClick={() => {
                          const target = conv.flaggedCount > 1 ? conv.messages.find((m) => m.status !== "active")?.from : conv.userA.name;
                          if (target) setWarnModal({ convId: conv.id, user: target });
                        }}
                        className="text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-vip-text hover:bg-admin-vip-bg"
                      >
                        Warn
                      </button>
                    )}
                    {conv.userA.status === "banned" || conv.userB.status === "banned" ? (
                      <button
                        onClick={() => {
                          const target = conv.userA.status === "banned" ? conv.userA.name : conv.userB.name;
                          handleUnbanUser(conv.id, target);
                        }}
                        className="text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-active-text hover:bg-admin-active-bg"
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const target = conv.userA.status === "warned" ? conv.userA.name : conv.userB.status === "warned" ? conv.userB.name : conv.userA.name;
                          setBanModal({ convId: conv.id, user: target });
                        }}
                        className="text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-non-text hover:bg-admin-non-bg"
                      >
                        Ban
                      </button>
                    )}
                  </div>
                </div>

                {selectedConv?.id === conv.id && (
                  <div className="mt-4 pt-4 border-t border-admin-border">
                    <div className="text-[12px] text-admin-muted mb-3">
                      Conversation between {conv.userA.name} and {conv.userB.name}
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {conv.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-3 p-3 rounded-md ${
                            msg.status === "banned"
                              ? "bg-admin-non-bg/30"
                              : msg.status === "flagged"
                              ? "bg-admin-vip-bg/20"
                              : "bg-admin-hover"
                          }`}
                        >
                          <img
                            src={`https://i.pravatar.cc/80?u=${msg.from}`}
                            alt={msg.from}
                            className="w-7 h-7 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[13px] font-semibold text-admin-text">{msg.from}</span>
                              <span className="text-[11px] text-admin-muted">{msg.time}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${statusStyles[msg.status]}`}>
                                {msg.status}
                              </span>
                            </div>
                            <p className="text-[13px] text-admin-nav-text">{msg.text}</p>
                            {msg.flaggedReason && (
                              <p className="text-[11.5px] text-admin-muted mt-1">Reason: {msg.flaggedReason}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {msg.status === "flagged" && (
                              <button
                                onClick={() => handleApproveMessage(conv.id, msg.id)}
                                className="text-[11px] px-2 py-1 rounded border border-admin-border text-admin-active-text hover:bg-admin-active-bg"
                              >
                                Approve
                              </button>
                            )}
                            {msg.status !== "banned" && (
                              <>
                                <button
                                  onClick={() => {
                                    setFlagReason("");
                                    handleFlagMessage(conv.id, msg.id);
                                  }}
                                  className="text-[11px] px-2 py-1 rounded border border-admin-border text-admin-vip-text hover:bg-admin-vip-bg"
                                >
                                  Flag
                                </button>
                                <button
                                  onClick={() => setDeleteModal({ convId: conv.id, msgId: msg.id })}
                                  className="text-[11px] px-2 py-1 rounded border border-admin-border text-admin-non-text hover:bg-admin-non-bg"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {banModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setBanModal(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[400px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[20px]">🚫</span>
              <h3 className="text-[16px] font-semibold text-admin-text">Ban User</h3>
            </div>
            <p className="text-[13px] text-admin-nav-text mb-4">
              Are you sure you want to ban <strong>{banModal.user}</strong>? This will delete all their messages and prevent them from sending new ones.
            </p>
            <div className="mb-4">
              <label className="block text-[12px] text-admin-muted mb-1">Reason for ban</label>
              <textarea
                rows={2}
                placeholder="Harassment, spam, inappropriate content..."
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setBanModal(null)}
                className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleBanUser}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-non-bg text-admin-non-text font-semibold hover:opacity-90"
              >
                Ban User
              </button>
            </div>
          </div>
        </div>
      )}

      {warnModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setWarnModal(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[400px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[20px]">⚠️</span>
              <h3 className="text-[16px] font-semibold text-admin-text">Warn User</h3>
            </div>
            <p className="text-[13px] text-admin-nav-text mb-4">
              Send a warning to <strong>{warnModal.user}</strong>. They will be notified that their messages were flagged by a moderator.
            </p>
            <div className="mb-4">
              <label className="block text-[12px] text-admin-muted mb-1">Warning message</label>
              <textarea
                rows={2}
                defaultValue="Your recent messages have been flagged by our moderation team. Please review our community guidelines. Continued violations may result in a ban."
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setWarnModal(null)}
                className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleWarnUser}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-vip-bg text-admin-vip-text font-semibold hover:opacity-90"
              >
                Send Warning
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setDeleteModal(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[400px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[20px]">🗑️</span>
              <h3 className="text-[16px] font-semibold text-admin-text">Delete Message</h3>
            </div>
            <p className="text-[13px] text-admin-nav-text mb-4">
              Are you sure you want to remove this message? It will be replaced with a moderator notice.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal(null)}
                className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMessage}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-non-bg text-admin-non-text font-semibold hover:opacity-90"
              >
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
