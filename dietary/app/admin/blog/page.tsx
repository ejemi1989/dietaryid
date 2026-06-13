"use client";

import { useState } from "react";
import { getPosts, getPublishedPosts, getLatestPosts, addPost, updatePost, deletePost } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

const categories = ["Product", "Creators", "Education", "Stories", "Guides"];
const iconOptions = ["🛡️", "⭐", "📅", "🔍", "❤️", "🎓", "📋", "🍝", "💰", "🌾", "👨‍👩‍👧", "📣", "🏆", "🔥", "🎉"];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(getPosts());
  const [tab, setTab] = useState<"all" | "published" | "drafts">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", author: "Emma Collins", role: "Head of Trust & Safety", cat: "Product", img: "🛡️", slug: "", published: true });

  const refresh = () => setPosts([...getPosts()]);

  const filtered = posts.filter((p) => {
    if (tab === "published") return p.published;
    if (tab === "drafts") return !p.published;
    return true;
  });

  const handleAdd = () => {
    if (!form.title.trim() || !form.excerpt.trim()) return;
    addPost({ ...form, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50) });
    refresh();
    setShowNew(false);
    setForm({ title: "", excerpt: "", content: "", author: "Emma Collins", role: "Head of Trust & Safety", cat: "Product", img: "🛡️", slug: "", published: true });
  };

  const handleEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content, author: p.author, role: p.role, cat: p.cat, img: p.img, slug: p.slug, published: p.published });
  };

  const handleSave = (id: string) => {
    updatePost(id, form);
    refresh();
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    deletePost(id);
    refresh();
  };

  const handleTogglePublish = (id: string, current: boolean) => {
    updatePost(id, { published: !current });
    refresh();
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Blog Management ✍️</h1>
            <p className="text-[13.5px] text-admin-muted">Create, edit and publish blog posts that appear on the DietaryID blog and homepage.</p>
          </div>
          <div className="flex items-center gap-3 text-[12.5px]">
            <span className="text-admin-muted">{posts.length} posts</span>
            <span className="text-admin-active-text">{posts.filter((p) => p.published).length} published</span>
            <button onClick={() => setShowNew(true)} className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">+ New post</button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {(["all", "published", "drafts"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${tab === t ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"}`}>
            {t === "all" ? `All (${posts.length})` : t === "published" ? `Published (${posts.filter((p) => p.published).length})` : `Drafts (${posts.filter((p) => !p.published).length})`}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[1000px]">
        {showNew && (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
            <h3 className="text-[16px] font-semibold text-admin-text mb-4">New blog post</h3>
            <BlogForm form={form} setForm={setForm} />
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-admin-border">
              <button onClick={() => setShowNew(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button onClick={handleAdd} disabled={!form.title.trim()} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">Publish post</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((p) => (
            <div key={p.id} className={`bg-admin-bg border rounded-[10px] ${editingId === p.id ? "border-admin-dark" : "border-admin-border"}`}>
              {editingId === p.id ? (
                <div className="p-5"><BlogForm form={form} setForm={setForm} /><div className="flex justify-end gap-2 mt-4 pt-4 border-t border-admin-border"><button onClick={() => setEditingId(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button><button onClick={() => handleSave(p.id)} disabled={!form.title.trim()} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">Save changes</button></div></div>
              ) : (
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[var(--color-nav-hover)] to-[var(--color-indigo-light)]/20 flex items-center justify-center text-[20px] flex-shrink-0">{p.img}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${p.published ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-vip-bg text-admin-vip-text"}`}>{p.published ? "PUBLISHED" : "DRAFT"}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-admin-hover text-admin-text">{p.cat}</span>
                        <span className="text-[11.5px] text-admin-muted ml-auto">{p.date}</span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-admin-text mb-1">{p.title}</h3>
                      <p className="text-[12.5px] text-admin-muted line-clamp-2 mb-2">{p.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-admin-muted"><span>{p.author}</span><span>·</span><span>{p.role}</span><span className="ml-2 text-[11px] font-mono text-admin-muted">{p.slug}</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-admin-border">
                    <button onClick={() => handleEdit(p)} className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg">Edit</button>
                    <button onClick={() => handleTogglePublish(p.id, p.published)} className={`text-[12px] px-2.5 py-1 rounded-md border ${p.published ? "border-admin-vip-text text-admin-vip-text hover:bg-admin-vip-bg" : "border-admin-active-text text-admin-active-text hover:bg-admin-active-bg"}`}>{p.published ? "Unpublish" : "Publish"}</button>
                    <button onClick={() => handleDelete(p.id)} className="text-[12px] px-2.5 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg ml-auto">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-12 text-admin-muted text-[13px]">No posts in this category.</div>}
        </div>
      </div>
    </div>
  );
}

function BlogForm({ form, setForm }: { form: any; setForm: (f: any) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div><div className="text-[12px] text-admin-muted mb-1">Title</div><input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" /></div>
        <div><div className="text-[12px] text-admin-muted mb-1">Slug (URL)</div><input type="text" value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} placeholder="auto-generated-from-title" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none font-mono" /></div>
      </div>
      <div><div className="text-[12px] text-admin-muted mb-1">Excerpt</div><textarea value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} rows={2} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" /></div>
      <div><div className="text-[12px] text-admin-muted mb-1">Content (markdown)</div><textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} rows={6} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none font-mono" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><div className="text-[12px] text-admin-muted mb-1">Author</div><input type="text" value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" /></div>
        <div><div className="text-[12px] text-admin-muted mb-1">Author role</div><input type="text" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" /></div>
        <div><div className="text-[12px] text-admin-muted mb-1">Category</div><select value={form.cat} onChange={(e) => setForm({...form, cat: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
      </div>
      <div>
        <div className="text-[12px] text-admin-muted mb-1">Icon</div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {iconOptions.map((i) => <button key={i} onClick={() => setForm({...form, img: i})} className={`text-[18px] p-1 rounded ${form.img === i ? "ring-2 ring-admin-dark bg-admin-active-bg" : "hover:bg-admin-hover"}`}>{i}</button>)}
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} className="w-4 h-4" /><span className="text-[13px] text-admin-text">Published</span></label>
    </div>
  );
}
