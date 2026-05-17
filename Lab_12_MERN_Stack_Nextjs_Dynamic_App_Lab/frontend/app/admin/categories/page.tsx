"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/api";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import toast from "react-hot-toast";

const emptyForm = { name: "", description: "", image: "" };

export default function AdminCategoriesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    fetchData();
  }, [user]);

  const fetchData = () => {
    setLoading(true);
    getCategories().then((r) => setCategories(r.data)).finally(() => setLoading(false));
  };

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (c: any) => { setEditId(c._id); setForm({ name: c.name, description: c.description || "", image: c.image || "" }); setShowModal(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) { await updateCategory(editId, form); toast.success("Category updated!"); }
      else { await createCategory(form); toast.success("Category created!"); }
      setShowModal(false);
      fetchData();
    } catch (err: any) { toast.error(err.response?.data?.message || "Failed to save"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This may affect products in this category.`)) return;
    try { await deleteCategory(id); toast.success("Deleted!"); fetchData(); }
    catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-gray-500 text-sm">{categories.length} total categories</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm font-semibold text-sm transition">
          <Plus size={16}/> Add Category
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-14 bg-gray-100 animate-pulse rounded" />)}</div>
      ) : (
        <div className="bg-white border border-gray-100 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Description</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{cat.name}</td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs hidden md:table-cell">{cat.slug}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell line-clamp-1">{cat.description || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition"><Pencil size={14}/></button>
                      <button onClick={() => handleDelete(cat._id, cat.name)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">{editId ? "Edit Category" : "Add Category"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="space-y-3">
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Category Name *</label>
                <input type="text" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="e.g. Chairs" className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400"/></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} rows={2} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"/></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                <input type="text" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} placeholder="https://..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400"/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-2.5 rounded-sm font-semibold text-sm transition">
                <Check size={16}/>{saving?"Saving...":"Save"}
              </button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50 text-sm transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
