"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from "@/lib/api";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const emptyForm = { name: "", description: "", price: "", salePrice: "", category: "", stock: "", images: "", featured: false, isSpecial: false, isPopular: false, isNewProduct: false };

export default function AdminProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    fetchData();
    getCategories().then((r) => setCategories(r.data));
  }, [user, page]);

  const fetchData = () => {
    setLoading(true);
    getProducts({ limit: 10, page }).then((r) => { setProducts(r.data.products); setTotal(r.data.total); }).finally(() => setLoading(false));
  };

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: any) => {
    setEditId(p._id);
    setForm({ name: p.name, description: p.description, price: p.price, salePrice: p.salePrice || "", category: p.category?._id || "", stock: p.stock, images: p.images.join(","), featured: p.featured, isSpecial: p.isSpecial, isPopular: p.isPopular, isNewProduct: p.isNewProduct });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), salePrice: form.salePrice ? Number(form.salePrice) : null, images: form.images.split(",").map((s: string) => s.trim()).filter(Boolean) };
      if (editId) { await updateProduct(editId, payload); toast.success("Product updated!"); }
      else { await createProduct(payload); toast.success("Product created!"); }
      setShowModal(false);
      fetchData();
    } catch (err: any) { toast.error(err.response?.data?.message || "Failed to save"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try { await deleteProduct(id); toast.success("Deleted!"); fetchData(); }
    catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-500 text-sm">{total} total products</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm font-semibold text-sm transition">
          <Plus size={16}/> Add Product
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(8)].map((_, i) => <div key={i} className="h-14 bg-gray-100 animate-pulse rounded" />)}</div>
      ) : (
        <div className="bg-white border border-gray-100 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Stock</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Badges</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={p.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80"} alt={p.name} fill className="object-cover" unoptimized/>
                        </div>
                        <span className="font-medium text-gray-800 line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category?.name || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {p.salePrice ? <><span className="text-orange-500">£{p.salePrice}</span><span className="text-gray-300 line-through ml-1 text-xs">£{p.price}</span></> : `£${p.price}`}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {p.featured && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Featured</span>}
                        {p.isSpecial && <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Special</span>}
                        {p.isPopular && <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Popular</span>}
                        {p.isNewProduct && <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">New</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition"><Pencil size={14}/></button>
                        <button onClick={() => handleDelete(p._id, p.name)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {total > 10 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(Math.ceil(total / 10))].map((_, i) => (
            <button key={i} onClick={() => setPage(i+1)} className={`w-9 h-9 text-sm rounded ${page===i+1?"bg-orange-500 text-white":"bg-white border border-gray-200 text-gray-600 hover:border-orange-400"} transition`}>{i+1}</button>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">{editId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="space-y-3">
              {[{key:"name",label:"Name",type:"text"},{key:"price",label:"Price (£)",type:"number"},{key:"salePrice",label:"Sale Price (£) — optional",type:"number"},{key:"stock",label:"Stock",type:"number"}].map(({key,label,type})=>(
                <div key={key}><label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type={type} value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400"/></div>
              ))}
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400">
                  <option value="">Select category</option>
                  {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} rows={3} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"/></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Image URLs (comma-separated)</label>
                <input type="text" value={form.images} onChange={(e)=>setForm({...form,images:e.target.value})} placeholder="https://..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400"/></div>
              <div className="flex flex-wrap gap-4">
                {[{key:"featured",label:"Featured"},{key:"isSpecial",label:"Special"},{key:"isPopular",label:"Popular"},{key:"isNewProduct",label:"New"}].map(({key,label})=>(
                  <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.checked})} className="accent-orange-500"/>
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-2.5 rounded-sm font-semibold text-sm transition">
                <Check size={16}/>{saving?"Saving...":"Save Product"}
              </button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-sm text-gray-600 hover:bg-gray-50 text-sm transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
