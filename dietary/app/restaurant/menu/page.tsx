"use client";

import { useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  status: "Verified" | "Pending" | "Not verified";
  gf: boolean;
  nf: boolean;
  df: boolean;
  vg: boolean;
  ingredients: string[];
  contains: Record<string, "Yes" | "No" | "Possible">;
  crossContamination: string;
  modifications: string[];
  canModify: boolean;
};

const initialMenu: MenuItem[] = [
  { id: "m_001", name: "Grilled Shrimp", description: "Fresh shrimp grilled with garlic and herbs", price: "12.50", category: "Appetizers", status: "Verified", gf: true, nf: false, df: true, vg: false, ingredients: ["Shrimp", "Garlic", "Olive oil", "Lemon", "Parsley"], contains: { gluten: "No", nuts: "No", shellfish: "Yes", dairy: "No", soy: "No", eggs: "No" }, crossContamination: "Shared grill with breaded items", modifications: ["Can omit garlic"], canModify: true },
  { id: "m_002", name: "Caesar Salad (GF)", description: "Classic Caesar with gluten-free croutons", price: "9.00", category: "Appetizers", status: "Verified", gf: true, nf: true, df: false, vg: false, ingredients: ["Romaine", "Parmesan", "GF croutons", "Anchovies"], contains: { gluten: "No", nuts: "No", shellfish: "Possible", dairy: "Yes", soy: "No", eggs: "Possible" }, crossContamination: "Prepared in separate area", modifications: ["Can omit croutons", "Can substitute dressing"], canModify: true },
  { id: "m_003", name: "Bruschetta", description: "Toasted bread with tomato, basil, garlic", price: "7.00", category: "Appetizers", status: "Pending", gf: false, nf: true, df: true, vg: true, ingredients: ["Bread (contains gluten)", "Tomato", "Basil", "Garlic", "Olive oil"], contains: { gluten: "Yes", nuts: "No", shellfish: "No", dairy: "No", soy: "No", eggs: "No" }, crossContamination: "Shared toaster", modifications: [], canModify: false },
  { id: "m_004", name: "Grilled Salmon", description: "Atlantic salmon with seasonal vegetables", price: "22.00", category: "Mains", status: "Verified", gf: true, nf: true, df: true, vg: false, ingredients: ["Salmon", "Olive oil", "Garlic", "Lemon", "Asparagus"], contains: { gluten: "No", nuts: "No", shellfish: "No", dairy: "No", soy: "No", eggs: "No" }, crossContamination: "Separate prep area", modifications: ["Can use olive oil instead of butter"], canModify: true },
  { id: "m_005", name: "Pasta Primavera", description: "Pasta with seasonal vegetables", price: "16.00", category: "Mains", status: "Not verified", gf: false, nf: true, df: false, vg: true, ingredients: ["Pasta (gluten)", "Tomato sauce", "Basil", "Garlic", "Olive oil", "Parmesan"], contains: { gluten: "Yes", nuts: "No", shellfish: "No", dairy: "Yes", soy: "No", eggs: "Possible" }, crossContamination: "", modifications: [], canModify: false },
  { id: "m_006", name: "Steak with Vegetables", description: "Grass-fed sirloin with grilled vegetables", price: "28.00", category: "Mains", status: "Verified", gf: true, nf: true, df: false, vg: false, ingredients: ["Sirloin steak", "Zucchini", "Bell pepper", "Butter"], contains: { gluten: "No", nuts: "No", shellfish: "No", dairy: "Yes", soy: "No", eggs: "No" }, crossContamination: "Shared grill", modifications: ["Can use olive oil instead of butter"], canModify: true },
  { id: "m_007", name: "Chocolate Cake (GF)", description: "Flourless chocolate cake with berries", price: "8.00", category: "Desserts", status: "Verified", gf: true, nf: false, df: false, vg: false, ingredients: ["Dark chocolate", "Eggs", "Butter", "Sugar", "Berries"], contains: { gluten: "No", nuts: "Possible", shellfish: "No", dairy: "Yes", soy: "Possible", eggs: "Yes" }, crossContamination: "Made in shared kitchen", modifications: [], canModify: false },
];

const categories = ["Appetizers", "Mains", "Desserts", "Beverages", "Sides"];
const allergenKeys = ["gluten", "nuts", "shellfish", "dairy", "soy", "eggs", "fish", "sesame"] as const;
const allergenLabels: Record<typeof allergenKeys[number], string> = {
  gluten: "Gluten", nuts: "Nuts", shellfish: "Shellfish", dairy: "Dairy", soy: "Soy", eggs: "Eggs", fish: "Fish", sesame: "Sesame",
};

const emptyItem: Omit<MenuItem, "id" | "status"> = {
  name: "", description: "", price: "", category: "Mains", gf: false, nf: false, df: false, vg: false,
  ingredients: [], contains: { gluten: "No", nuts: "No", shellfish: "No", dairy: "No", soy: "No", eggs: "No" },
  crossContamination: "", modifications: [], canModify: false,
};

export default function RestaurantMenuPage() {
  const [menu, setMenu] = useState(initialMenu);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, "id" | "status">>(emptyItem);
  const [newIngredient, setNewIngredient] = useState("");
  const [newModification, setNewModification] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const verified = menu.filter((m) => m.status === "Verified").length;
  const total = menu.length;
  const percent = Math.round((verified / total) * 100);

  const handleAdd = () => {
    setForm(emptyItem);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (item: MenuItem) => {
    setForm({
      name: item.name, description: item.description, price: item.price, category: item.category,
      gf: item.gf, nf: item.nf, df: item.df, vg: item.vg,
      ingredients: [...item.ingredients], contains: { ...item.contains },
      crossContamination: item.crossContamination, modifications: [...item.modifications], canModify: item.canModify,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      setMenu((prev) => prev.map((m) => m.id === editingId ? { ...m, ...form, status: m.status } : m));
    } else {
      setMenu((prev) => [
        ...prev,
        { id: `m_${Date.now()}`, ...form, status: "Not verified" },
      ]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setMenu((prev) => prev.filter((m) => m.id !== id));
    setConfirmDelete(null);
  };

  const handleVerify = (id: string) => {
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Verified" as const } : m)));
  };

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    setForm((f) => ({ ...f, ingredients: [...f.ingredients, newIngredient] }));
    setNewIngredient("");
  };

  const removeIngredient = (i: number) => {
    setForm((f) => ({ ...f, ingredients: f.ingredients.filter((_, idx) => idx !== i) }));
  };

  const addModification = () => {
    if (!newModification.trim()) return;
    setForm((f) => ({ ...f, modifications: [...f.modifications, newModification] }));
    setNewModification("");
  };

  const removeModification = (i: number) => {
    setForm((f) => ({ ...f, modifications: f.modifications.filter((_, idx) => idx !== i) }));
  };

  const filteredMenu = menu.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Menu Management</h1>
        <p className="text-[14px] text-admin-muted">Manage and verify your menu items for allergen safety.</p>
      </div>

      <div className="px-[26px] py-4 border-b border-admin-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-admin-text font-medium">Verification Progress</span>
          <span className="text-[13px] text-admin-muted">{verified} of {total} verified ({percent}%)</span>
        </div>
        <div className="w-full h-2 bg-admin-border rounded-full">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              backgroundColor: percent < 30 ? "var(--color-admin-non-text)" : percent < 70 ? "var(--color-admin-vip-text)" : "var(--color-admin-active-text)",
            }}
          />
        </div>
      </div>

      <div className="px-[26px] py-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
            >
              + Add Menu Item
            </button>
            <button
              onClick={() => setShowImport(true)}
              className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              ⬆ Import menu
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
              placeholder="Search items..."
              className="pl-8 pr-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none w-[200px]"
            />
          </div>
        </div>

        {categories.map((cat) => {
          const items = filteredMenu.filter((m) => m.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-6">
              <h2 className="text-[14px] font-semibold text-admin-text uppercase tracking-[0.05em] mb-2">{cat}</h2>
              <div className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">Item</th>
                      <th className="text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">Status</th>
                      <th className="text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold hidden md:table-cell">Safe For</th>
                      <th className="text-right text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-admin-hover">
                        <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-[12px] text-admin-muted">${item.price}</div>
                          </div>
                        </td>
                        <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                          <span className={`text-[12px] py-[3px] px-[10px] rounded-[6px] ${
                            item.status === "Verified" ? "bg-admin-active-bg text-admin-active-text" :
                            item.status === "Pending" ? "bg-admin-vip-bg text-admin-vip-text" :
                            "bg-admin-non-bg text-admin-non-text"
                          }`}>
                            {item.status === "Verified" ? "✓ " : item.status === "Pending" ? "⏳ " : "✗ "}{item.status}
                          </span>
                        </td>
                        <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border hidden md:table-cell">
                          <div className="flex items-center gap-2 text-[13px]">
                            <span className={item.gf ? "text-admin-active-text" : "text-admin-non-text"}>GF {item.gf ? "✓" : "✗"}</span>
                            <span className={item.nf ? "text-admin-active-text" : "text-admin-non-text"}>NF {item.nf ? "✓" : "✗"}</span>
                            <span className={item.df ? "text-admin-active-text" : "text-admin-non-text"}>DF {item.df ? "✓" : "✗"}</span>
                            <span className={item.vg ? "text-admin-active-text" : "text-admin-non-text"}>VG {item.vg ? "✓" : "✗"}</span>
                          </div>
                        </td>
                        <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                            >
                              Edit
                            </button>
                            {item.status !== "Verified" && (
                              <button
                                onClick={() => handleVerify(item.id)}
                                className="text-[12px] px-2 py-1 rounded-md bg-admin-active-text text-white hover:opacity-90"
                              >
                                Verify
                              </button>
                            )}
                            {confirmDelete === item.id ? (
                              <>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-[12px] px-2 py-1 rounded-md bg-admin-non-text text-white hover:opacity-90"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(item.id)}
                                className="text-[12px] px-2 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {filteredMenu.length === 0 && (
          <div className="text-center py-12 text-[13px] text-admin-muted">
            No items match &quot;{search}&quot;. Try a different search.
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[680px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-4">
              {editingId ? `Edit ${menu.find((m) => m.id === editingId)?.name}` : "Add Menu Item"}
            </h3>

            <div className="space-y-5">
              <div>
                <div className="text-[13px] font-semibold text-admin-text mb-2">Item Details</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Name *</div>
                    <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Category</div>
                    <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Price</div>
                    <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="0.00" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-[12px] text-admin-muted mb-1">Description</div>
                    <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none" />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-admin-text mb-2">Ingredients</div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
                    placeholder="Add ingredient (press Enter)"
                    className="flex-1 px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                  />
                  <button onClick={addIngredient} className="text-[12px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">+ Add</button>
                </div>
                {form.ingredients.length > 0 && (
                  <ul className="space-y-1">
                    {form.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 p-2 rounded-md bg-admin-hover">
                        <span className="text-[13px] text-admin-nav-text flex-1">• {ing}</span>
                        <button onClick={() => removeIngredient(i)} className="text-admin-muted hover:text-admin-non-text text-[14px]">✕</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <div className="text-[13px] font-semibold text-admin-text mb-2">Contains allergens</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {allergenKeys.map((k) => (
                    <div key={k}>
                      <div className="text-[12px] text-admin-muted mb-1">{allergenLabels[k]}</div>
                      <select
                        value={form.contains[k]}
                        onChange={(e) => setForm((f) => ({ ...f, contains: { ...f.contains, [k]: e.target.value as "Yes" | "No" | "Possible" } }))}
                        className="w-full px-2 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none"
                      >
                        <option>No</option>
                        <option>Yes</option>
                        <option>Possible</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-admin-text mb-2">Cross-contamination notes</div>
                <input
                  value={form.crossContamination}
                  onChange={(e) => setForm((f) => ({ ...f, crossContamination: e.target.value }))}
                  placeholder="e.g. Shared grill, dedicated fryer, separate prep area"
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                />
              </div>

              <div>
                <div className="text-[13px] font-semibold text-admin-text mb-2">Safe-for labels</div>
                <p className="text-[11.5px] text-admin-muted mb-2">Auto-suggested based on ingredients. Override if needed.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { k: "gf" as const, l: "✓ Gluten-free" },
                    { k: "nf" as const, l: "✓ Nut-free" },
                    { k: "df" as const, l: "✓ Dairy-free" },
                    { k: "vg" as const, l: "✓ Vegan" },
                  ].map((a) => (
                    <label key={a.k} className="flex items-center gap-2 p-2 rounded-md border border-admin-border cursor-pointer hover:bg-admin-hover">
                      <input
                        type="checkbox"
                        checked={form[a.k]}
                        onChange={() => setForm((f) => ({ ...f, [a.k]: !f[a.k] }))}
                        className="w-4 h-4"
                      />
                      <span className="text-[12.5px] text-admin-text">{a.l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-admin-text mb-2">Modifications available</div>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.canModify}
                    onChange={() => setForm((f) => ({ ...f, canModify: !f.canModify }))}
                    className="w-4 h-4"
                  />
                  <span className="text-[12.5px] text-admin-text">Can be modified for allergies</span>
                </label>
                {form.canModify && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        value={newModification}
                        onChange={(e) => setNewModification(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addModification())}
                        placeholder="e.g. Can remove cheese, use GF bread"
                        className="flex-1 px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                      />
                      <button onClick={addModification} className="text-[12px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">+ Add</button>
                    </div>
                    <ul className="space-y-1">
                      {form.modifications.map((m, i) => (
                        <li key={i} className="flex items-center gap-2 p-2 rounded-md bg-admin-hover">
                          <span className="text-[13px] text-admin-nav-text flex-1">• {m}</span>
                          <button onClick={() => removeModification(i)} className="text-admin-muted hover:text-admin-non-text text-[14px]">✕</button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-2 mt-5 pt-4 border-t border-admin-border">
              <div>
                {editingId && (
                  <button
                    onClick={() => { handleDelete(editingId); setShowForm(false); }}
                    className="text-[13px] px-3 py-2 rounded-md text-admin-non-text hover:bg-admin-non-bg"
                  >
                    Delete item
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                <button
                  onClick={handleSave}
                  disabled={!form.name.trim()}
                  className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                >
                  {editingId ? "Save changes" : "Save & add another"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImport && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowImport(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[500px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Import menu</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Upload a PDF or image of your menu. We&apos;ll extract items automatically so you can review and verify them.</p>
            <div className="border-2 border-dashed border-admin-border rounded-md p-8 text-center mb-3">
              <div className="text-[40px] mb-2">📄</div>
              <p className="text-[13px] text-admin-text mb-1">Drop your menu file here</p>
              <p className="text-[12px] text-admin-muted mb-3">PDF, JPG, or PNG up to 10MB</p>
              <button className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90">Choose file</button>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowImport(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => { setShowImport(false); alert("Menu uploaded — extraction in progress (mock)"); }}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
