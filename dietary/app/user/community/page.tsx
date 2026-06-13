"use client";

import { useState } from "react";
import Link from "next/link";
import { notifyUser } from "@/lib/notifications";

type Comment = {
  id: string;
  author: string;
  restriction: string;
  text: string;
  time: string;
  likes: number;
  isHelpful: boolean;
  isHelpfulMarked: boolean;
  liked: boolean;
};

type Post = {
  id: string;
  type: "recommendation" | "question" | "tip" | "win" | "warning" | "support" | "announcement";
  author: string;
  authorRestriction: string;
  matchesMe: boolean;
  time: string;
  location: string;
  title: string;
  content: string;
  restaurant?: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  saves: number;
  liked: boolean;
  saved: boolean;
  creator?: boolean;
};

const initialPosts: Post[] = [
  {
    id: "p1",
    type: "recommendation",
    author: "Sarah M.",
    authorRestriction: "Has Celiac",
    matchesMe: true,
    time: "2 hours ago",
    location: "Manchester, UK",
    title: "Just discovered the best gluten-free pizza place in Manchester!! 🍕",
    content: "The Healthy Crust on King Street. They have a dedicated oven for gluten-free. Super knowledgeable staff. I've been 3 times and zero reactions. If you're in Manchester, you HAVE to go. 10/10 would recommend.",
    restaurant: "The Healthy Crust",
    tags: ["Gluten-Free", "Celiac"],
    likes: 142,
    comments: [
      { id: "c1", author: "Mike H.", restriction: "Has Celiac", text: "YES! I was just there last week. The staff really knows their stuff. Worth the trip!", time: "1h ago", likes: 34, isHelpful: true, isHelpfulMarked: true, liked: false },
      { id: "c2", author: "Jordan L.", restriction: "Has IBS", text: "Question - do they have options for IBS? I see they're gluten-free but looking for low-FODMAP options too", time: "45m ago", likes: 12, isHelpful: false, isHelpfulMarked: false, liked: false },
    ],
    saves: 18,
    liked: false,
    saved: false,
    creator: true,
  },
  {
    id: "p2",
    type: "question",
    author: "Jordan L.",
    authorRestriction: "Has Celiac + IBS",
    matchesMe: true,
    time: "5 hours ago",
    location: "London, UK",
    title: "Has anyone tried the new gluten-free bakery in Camden?",
    content: "Saw it on Instagram and wondering if it's actually safe. Anyone been? Looking for low-FODMAP options too if possible. Thanks!",
    tags: ["Gluten-Free", "Low FODMAP"],
    likes: 23,
    comments: [
      { id: "c3", author: "Emma T.", restriction: "Has Celiac", text: "Yes! I've been twice. Super careful with cross-contamination. Recommend 100%.", time: "4h ago", likes: 18, isHelpful: true, isHelpfulMarked: true, liked: false },
    ],
    saves: 5,
    liked: false,
    saved: false,
  },
  {
    id: "p3",
    type: "tip",
    author: "Mike H.",
    authorRestriction: "Has Celiac",
    matchesMe: true,
    time: "1 day ago",
    location: "Manchester, UK",
    title: "Tip: Always ask about the dedicated fryer",
    content: "Pro tip from 8 years of eating out: always ask if the restaurant has a dedicated gluten-free fryer. Most places say they 'take allergies seriously' but share fryers with everything else. The Italian Kitchen on Oxford Road is one of the few that actually has a dedicated GF prep area. Worth asking before you order anything fried!",
    tags: ["Gluten-Free", "Cross-contamination"],
    likes: 89,
    comments: [],
    saves: 24,
    liked: false,
    saved: false,
  },
  {
    id: "p4",
    type: "win",
    author: "Emma T.",
    authorRestriction: "Has Crohn's",
    matchesMe: false,
    time: "1 day ago",
    location: "Bristol, UK",
    title: "I just successfully ate out and felt AMAZING 🎉",
    content: "This community made it possible. After 3 years of being afraid to eat out, I went to dinner last night and had zero pain. Thank you to everyone who shares their experiences. You gave me the courage to try again. ❤️",
    tags: ["Crohn's", "Wins"],
    likes: 247,
    comments: [
      { id: "c4", author: "Sarah M.", restriction: "Has Celiac", text: "So happy for you! 🎉", time: "12h ago", likes: 8, isHelpful: false, isHelpfulMarked: false, liked: false },
    ],
    saves: 12,
    liked: false,
    saved: false,
  },
  {
    id: "p5",
    type: "warning",
    author: "Sam K.",
    authorRestriction: "Has Nut Allergy",
    matchesMe: false,
    time: "2 days ago",
    location: "Manchester, UK",
    title: "⚠️ Be careful at Spice Garden, had a reaction",
    content: "Went there Saturday night, ordered what I was told was a 'nut-free' curry. Had anaphylaxis. The waiter checked with the kitchen but turns out they use cashew paste as a base for 'most curries'. I didn't think to ask. PLEASE always ask about hidden ingredients. This could've killed me.",
    restaurant: "Spice Garden",
    tags: ["Nut Allergy", "Warning"],
    likes: 67,
    comments: [],
    saves: 41,
    liked: false,
    saved: false,
  },
];

const postTypeConfig = {
  recommendation: { label: "Restaurant Recommendation", emoji: "🍽️", color: "admin-active" },
  question: { label: "Question", emoji: "❓", color: "admin-new" },
  tip: { label: "Tip / Hack", emoji: "💡", color: "admin-vip" },
  win: { label: "Celebration", emoji: "🎉", color: "admin-active" },
  warning: { label: "Warning", emoji: "⚠️", color: "admin-non" },
  support: { label: "Advice / Support", emoji: "💪", color: "admin-vip" },
  announcement: { label: "Announcement", emoji: "📣", color: "admin-new" },
};

const stats = [
  { label: "Community Members", value: "12,450", icon: "👥", trend: "247 new this week" },
  { label: "Posts This Week", value: "847", icon: "💬", trend: "↑ +12% from last week" },
  { label: "Restaurants Verified", value: "2,341", icon: "✓", trend: "by our community" },
  { label: "Reviews Written", value: "14,732", icon: "⭐", trend: "Helping each other eat safely" },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState<"all" | "trending" | "recent" | "celiac" | "questions" | "recs" | "tips">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [postType, setPostType] = useState<"recommendation" | "question" | "tip" | "win" | "warning" | "support">("recommendation");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState<string[]>([]);
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [showShare, setShowShare] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  const handleFollow = (author: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(author)) { next.delete(author); }
      else { next.add(author); notifyUser("You followed " + author, "/user/profile"); }
      return next;
    });
  };

  const handleShareCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://dietaryid.com/community/${showShare}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      setShareCopied(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
    if (!posts.find((p) => p.id === postId)?.liked) {
      const author = posts.find((p) => p.id === postId)?.author;
      if (author && author !== "Sarah Mitchell") {
        notifyUser("You liked " + author + "'s post", "/user/community");
      }
    }
  };

  const handleSavePost = (postId: string) => {
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, saved: !p.saved, saves: p.saved ? p.saves - 1 : p.saves + 1 } : p));
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts((prev) => prev.map((p) => p.id === postId ? {
      ...p,
      comments: p.comments.map((c) => c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c),
    } : p));
  };

  const handleMarkHelpful = (postId: string, commentId: string) => {
    setPosts((prev) => prev.map((p) => p.id === postId ? {
      ...p,
      comments: p.comments.map((c) => c.id === commentId ? { ...c, isHelpfulMarked: !c.isHelpfulMarked, likes: c.isHelpfulMarked ? c.likes - 1 : c.likes + 1 } : c),
    } : p));
  };

  const handleSubmitReply = (postId: string) => {
    if (!replyText.trim()) return;
    const newComment: Comment = {
      id: `c_new_${Date.now()}`,
      author: "Sarah Mitchell",
      restriction: "Has Celiac",
      text: replyText,
      time: "Just now",
      likes: 0,
      isHelpful: false,
      isHelpfulMarked: false,
      liked: false,
    };
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
    setReplyingTo(null);
    setReplyText("");
    const author = posts.find((p) => p.id === postId)?.author;
    if (author && author !== "Sarah Mitchell") {
      notifyUser("You replied to " + author + "'s post", "/user/community");
    }
  };

  const handleSubmitPost = () => {
    if (!postTitle.trim() || !postContent.trim()) return;
    const newPost: Post = {
      id: `p_new_${Date.now()}`,
      type: postType,
      author: "Sarah Mitchell",
      authorRestriction: "Has Celiac",
      matchesMe: true,
      time: "Just now",
      location: "Manchester, UK",
      title: postTitle,
      content: postContent,
      tags: postTags.length > 0 ? postTags : ["Celiac"],
      likes: 0,
      comments: [],
      saves: 0,
      liked: false,
      saved: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setShowCreate(false);
    setPostTitle("");
    setPostContent("");
    setPostTags([]);
    notifyUser("Your post was published to the community", "/user/community");
  };

  const filteredPosts = posts.filter((p) => {
    if (filter === "trending") return p.likes > 50;
    if (filter === "recent") return true;
    if (filter === "celiac") return p.tags.includes("Celiac") || p.tags.includes("Gluten-Free");
    if (filter === "questions") return p.type === "question";
    if (filter === "recs") return p.type === "recommendation";
    if (filter === "tips") return p.type === "tip" || p.type === "win";
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">DietaryID Community</h1>
            <p className="text-[13.5px] text-admin-muted">Real people, real experiences, real help</p>
            <p className="text-[12px] text-admin-muted mt-1">12,450 people eating safely together · 847 posts this week</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="text-[14px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 font-medium"
          >
            + Share Your Experience
          </button>
        </div>
      </div>

      {showCreate && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto"
          onClick={() => setShowCreate(false)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[600px] w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Share Your Experience</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Help others eat safely by sharing your story</p>

            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Post type</div>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(postTypeConfig) as Array<keyof typeof postTypeConfig>).filter((t) => t !== "announcement").map((t) => (
                    <button
                      key={t}
                      onClick={() => setPostType(t as typeof postType)}
                      className={`text-[12px] py-2 px-2 rounded-md border transition-colors ${
                        postType === t ? "border-admin-dark bg-admin-active-bg" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      }`}
                    >
                      {postTypeConfig[t].emoji} {postTypeConfig[t].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[12px] text-admin-muted mb-1">Title</div>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  maxLength={100}
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                />
                <div className="text-[11px] text-admin-muted text-right mt-1">{postTitle.length}/100</div>
              </div>

              <div>
                <div className="text-[12px] text-admin-muted mb-1">Content</div>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share your experience, question, or advice..."
                  maxLength={2000}
                  rows={5}
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
                />
                <div className="text-[11px] text-admin-muted text-right mt-1">{postContent.length}/2000</div>
              </div>

              <div>
                <div className="text-[12px] text-admin-muted mb-1">Tags (your restrictions)</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["Celiac", "Gluten-Free", "Dairy-Free", "Crohn's", "IBS", "Low FODMAP", "Nut-Free"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPostTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])}
                      className={`text-[11.5px] px-2 py-1 rounded-md border transition-colors ${
                        postTags.includes(t) ? "border-admin-dark bg-admin-active-bg text-admin-active-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      }`}
                    >
                      {postTags.includes(t) ? "✓ " : ""}{t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCreate(false)}
                className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                disabled={!postTitle.trim() || !postContent.trim()}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[12px] text-admin-muted">{s.label}</div>
                <div className="text-[20px]">{s.icon}</div>
              </div>
              <div className="text-[22px] font-semibold text-admin-text">{s.value}</div>
              <div className="text-[11.5px] text-admin-muted mt-0.5">{s.trend}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-4 flex-wrap">
          {[
            { v: "all", l: "All" },
            { v: "trending", l: "Trending" },
            { v: "recent", l: "Recent" },
            { v: "celiac", l: "For Celiac" },
            { v: "recs", l: "🍽️ Recommendations" },
            { v: "questions", l: "❓ Questions" },
            { v: "tips", l: "💡 Tips & Wins" },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v as typeof filter)}
              className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
              }`}
            >
              {f.l}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 text-center">
              <div className="text-[40px] mb-2">🤷</div>
              <p className="text-[14px] text-admin-muted">No posts in this category yet.</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const config = postTypeConfig[post.type];
              return (
                <div key={post.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={`https://i.pravatar.cc/80?u=${post.author}`} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[14px] font-semibold text-admin-text">{post.author}</span>
                        <span className="text-[12px] text-admin-muted">| {post.authorRestriction}</span>
                        {post.creator && <span className="text-[10px] px-1.5 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text font-semibold">✓ Creator</span>}
                        {post.matchesMe && (
                          <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-semibold">
                            Has Celiac like you
                          </span>
                        )}
                        <span className="text-[12px] text-admin-muted ml-auto">{post.time}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-[12px] text-admin-muted">📍 {post.location}</div>
                        {post.author !== "Sarah Mitchell" && (
                          <>
                            <button
                              onClick={() => handleFollow(post.author)}
                              className={`text-[11.5px] px-2 py-0.5 rounded-md transition-colors ${
                                followed.has(post.author) ? "bg-admin-active-bg text-admin-active-text" : "border border-admin-border text-admin-text hover:bg-admin-hover"
                              }`}
                            >
                              {followed.has(post.author) ? "✓ Following" : "+ Follow"}
                            </button>
                            <Link
                              href="/user/messages"
                              className="text-[11.5px] text-admin-new-text no-underline hover:underline"
                            >
                              💬 Message
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium`}>
                      {config.emoji} {config.label}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-semibold text-admin-text mb-2">{post.title}</h3>
                  <p className="text-[14px] text-admin-nav-text mb-3">{post.content}</p>

                  {post.restaurant && (
                    <div className="mb-3 inline-flex items-center gap-2 text-[12.5px] px-3 py-1.5 rounded-md bg-admin-hover">
                      <span>🏪</span>
                      <span className="font-medium text-admin-text">{post.restaurant}</span>
                      <Link href={`/user/find?restaurant=${post.restaurant}`} className="text-admin-new-text no-underline hover:underline">View →</Link>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                    {post.tags.map((t) => (
                      <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-nav-text">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-[12.5px] text-admin-muted mb-3">
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.comments.length} comments</span>
                    <span>🔖 {post.saves} saves</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`text-[12.5px] px-2.5 py-1 rounded-md border transition-colors ${
                        post.liked ? "border-admin-non-text bg-admin-non-bg text-admin-non-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      }`}
                    >
                      {post.liked ? "❤️ Liked" : "🤍 Like"}
                    </button>
                    <button
                      onClick={() => { setReplyingTo(replyingTo === post.id ? null : post.id); setReplyText(""); }}
                      className="text-[12.5px] px-2.5 py-1 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                    >
                      💬 Reply
                    </button>
                    <button
                      onClick={() => handleSavePost(post.id)}
                      className={`text-[12.5px] px-2.5 py-1 rounded-md border transition-colors ${
                        post.saved ? "border-admin-active-text bg-admin-active-bg text-admin-active-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      }`}
                    >
                      {post.saved ? "🔖 Saved" : "🔖 Save"}
                    </button>
                    <button
                      onClick={() => { setShowShare(post.id); setShareCopied(false); }}
                      className="text-[12.5px] px-2.5 py-1 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                    >
                      ↗ Share
                    </button>
                    <button className="text-[12.5px] px-2.5 py-1 rounded-md text-admin-muted hover:text-admin-non-text">
                      ⚐ Report
                    </button>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-admin-border space-y-3">
                      {post.comments.sort((a, b) => (b.isHelpfulMarked ? 1 : 0) - (a.isHelpfulMarked ? 1 : 0)).map((c) => (
                        <div key={c.id} className="flex items-start gap-2">
                          <img src={`https://i.pravatar.cc/80?u=${c.author}`} alt={c.author} className="w-7 h-7 rounded-full" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                              <span className="text-[12.5px] font-semibold text-admin-text">{c.author}</span>
                              <span className="text-[11px] text-admin-muted">| {c.restriction}</span>
                              {c.isHelpfulMarked && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text font-semibold">
                                  ✓ HELPFUL
                                </span>
                              )}
                              <span className="text-[11px] text-admin-muted ml-auto">{c.time}</span>
                            </div>
                            <p className="text-[13px] text-admin-nav-text mb-1.5">&ldquo;{c.text}&rdquo;</p>
                            <div className="flex items-center gap-2 text-[11.5px]">
                              <button
                                onClick={() => handleLikeComment(post.id, c.id)}
                                className={`flex items-center gap-1 ${c.liked ? "text-admin-non-text" : "text-admin-muted hover:text-admin-text"}`}
                              >
                                {c.liked ? "❤️" : "🤍"} {c.likes}
                              </button>
                              {post.type === "question" && (
                                <button
                                  onClick={() => handleMarkHelpful(post.id, c.id)}
                                  className={`px-1.5 py-0.5 rounded ${c.isHelpfulMarked ? "bg-admin-vip-bg text-admin-vip-text" : "text-admin-muted hover:text-admin-vip-text"}`}
                                >
                                  ✓ Mark helpful
                                </button>
                              )}
                              <button className="text-admin-muted hover:text-admin-text">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {replyingTo === post.id && (
                    <div className="mt-3 pt-3 border-t border-admin-border">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Add a comment..."
                        rows={2}
                        maxLength={500}
                        className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
                        autoFocus
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-admin-muted">{replyText.length}/500</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setReplyingTo(null); setReplyText(""); }}
                            className="text-[12px] px-3 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmitReply(post.id)}
                            disabled={!replyText.trim()}
                            className="text-[12px] px-3 py-1 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {showShare && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowShare(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Share this post</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Help spread safe-eating knowledge.</p>
            <div className="mb-3">
              <div className="text-[12.5px] text-admin-muted mb-1">Public link</div>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  readOnly
                  value={`https://dietaryid.com/community/${showShare}`}
                  className="flex-1 px-2.5 py-1.5 border border-admin-border rounded-md text-[12px] font-mono text-admin-text bg-admin-hover"
                />
                <button
                  onClick={handleShareCopy}
                  className="text-[12px] px-2.5 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
                >
                  {shareCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-[12.5px] text-admin-muted mb-2">Share via</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: "Email", emoji: "📧" },
                  { name: "Twitter", emoji: "🐦" },
                  { name: "Facebook", emoji: "📘" },
                  { name: "WhatsApp", emoji: "💬" },
                  { name: "Copy link", emoji: "🔗" },
                  { name: "Native share", emoji: "📱" },
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={() => { setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); }}
                    className="text-[12px] px-2 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                  >
                    {s.emoji} {s.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <div className="text-[12.5px] text-admin-muted mb-1">Message a friend</div>
              <input
                type="text"
                placeholder="Search people..."
                className="w-full px-2.5 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowShare(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
