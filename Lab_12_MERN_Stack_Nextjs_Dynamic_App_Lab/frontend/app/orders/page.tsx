"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders } from "@/lib/api";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMyOrders().then((r) => setOrders(r.data)).finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h2 className="text-xl font-semibold mb-4">Please login to view your orders</h2>
      <Link href="/auth/login" className="bg-orange-500 text-white px-6 py-2 rounded-sm font-semibold hover:bg-orange-600 transition">Login</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-100 animate-pulse rounded" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 mb-4">You have no orders yet.</p>
          <Link href="/products" className="bg-orange-500 text-white px-6 py-2 rounded-sm font-semibold hover:bg-orange-600 transition">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order._id} href={`/orders/${order._id}`}>
              <div className="bg-white border border-gray-100 rounded p-4 flex items-center justify-between hover:shadow-sm transition group">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.items.length} item(s) · £{order.totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>{order.status}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-orange-500 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
