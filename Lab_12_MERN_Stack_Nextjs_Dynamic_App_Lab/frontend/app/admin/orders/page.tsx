"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAllOrders, updateOrderStatus } from "@/lib/api";
import toast from "react-hot-toast";
import { Package } from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700", Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700", Delivered: "bg-green-100 text-green-700", Cancelled: "bg-red-100 text-red-600",
};

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    getAllOrders().then((r) => setOrders(r.data)).finally(() => setLoading(false));
  }, [user]);

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      toast.success(`Status updated to ${status}`);
    } catch { toast.error("Failed to update status"); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
          <p className="text-gray-500 text-sm">{orders.length} total orders</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-14 bg-gray-100 animate-pulse rounded" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Package size={48} className="mx-auto mb-4 text-gray-200"/>
          <p>No orders found</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Items</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Update</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 text-xs">{order.user?.name || "N/A"}</p>
                      <p className="text-gray-400 text-xs">{order.user?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{order.items.length}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">£{order.totalPrice.toFixed(2)}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status] || "bg-gray-100"}`}>{order.status}</span></td>
                    <td className="px-4 py-3">
                      <select value={order.status} onChange={(e) => handleStatus(order._id, e.target.value)}
                        className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-orange-400 bg-white">
                        {["Pending","Processing","Shipped","Delivered","Cancelled"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
