"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getProducts, getAllOrders, getUsers, getCategories } from "@/lib/api";
import Link from "next/link";
import { Package, ShoppingBag, Users, Tag, TrendingUp, ArrowRight, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, categories: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push("/auth/login"); return; }
    if (user.role !== "admin") { router.push("/"); return; }
    Promise.all([getProducts({ limit: 1 }), getAllOrders(), getUsers(), getCategories()]).then(([p, o, u, c]) => {
      const orders = o.data;
      const revenue = orders.reduce((sum: number, ord: any) => sum + ord.totalPrice, 0);
      setStats({ products: p.data.total, orders: orders.length, users: u.data.length, categories: c.data.length, revenue });
      setRecentOrders(orders.slice(0, 5));
    }).finally(() => setLoading(false));
  }, [user]);

  if (!user || user.role !== "admin") return null;

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700", Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700", Delivered: "bg-green-100 text-green-700", Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {user.name}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Settings size={14}/> Admin Panel
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { icon: Package, label: "Products", value: stats.products, color: "text-blue-500", bg: "bg-blue-50", href: "/admin/products" },
          { icon: ShoppingBag, label: "Orders", value: stats.orders, color: "text-orange-500", bg: "bg-orange-50", href: "/admin/orders" },
          { icon: Users, label: "Users", value: stats.users, color: "text-green-500", bg: "bg-green-50", href: "/admin/orders" },
          { icon: Tag, label: "Categories", value: stats.categories, color: "text-purple-500", bg: "bg-purple-50", href: "/admin/categories" },
          { icon: TrendingUp, label: "Revenue", value: `£${stats.revenue.toFixed(0)}`, color: "text-rose-500", bg: "bg-rose-50", href: "/admin/orders" },
        ].map(({ icon: Icon, label, value, color, bg, href }) => (
          <Link key={label} href={href}>
            <div className="bg-white border border-gray-100 rounded p-4 hover:shadow-sm transition group">
              <div className={`w-10 h-10 ${bg} rounded flex items-center justify-center mb-3`}>
                <Icon size={20} className={color} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{loading ? "—" : value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { href: "/admin/products", label: "Manage Products", desc: "Add, edit or remove products", icon: Package },
          { href: "/admin/categories", label: "Manage Categories", desc: "Organize your product categories", icon: Tag },
          { href: "/admin/orders", label: "Manage Orders", desc: "View and update order statuses", icon: ShoppingBag },
        ].map(({ href, label, desc, icon: Icon }) => (
          <Link key={href} href={href}>
            <div className="bg-white border border-gray-100 rounded p-5 flex items-center gap-4 hover:shadow-sm hover:border-orange-200 transition group">
              <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm group-hover:text-orange-500 transition">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-orange-400 transition" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-100 rounded p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-orange-500 hover:underline text-sm">View all</Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-50 animate-pulse rounded" />)}</div>
        ) : recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-xs text-gray-400 uppercase tracking-wide border-b">
                <th className="pb-2 text-left">Order ID</th>
                <th className="pb-2 text-left">Customer</th>
                <th className="pb-2 text-left">Date</th>
                <th className="pb-2 text-left">Total</th>
                <th className="pb-2 text-left">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 font-mono text-xs text-gray-600">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 text-gray-700">{order.user?.name || "N/A"}</td>
                    <td className="py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 font-semibold text-gray-900">£{order.totalPrice.toFixed(2)}</td>
                    <td className="py-3"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status] || "bg-gray-100"}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
