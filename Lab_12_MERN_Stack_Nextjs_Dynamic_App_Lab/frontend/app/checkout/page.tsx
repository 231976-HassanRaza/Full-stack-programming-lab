"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    phone: "",
    paymentMethod: "COD",
  });

  const shipping = total >= 50 ? 0 : 9.99;
  const grandTotal = total + shipping;

  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-xl font-semibold mb-4">Please login to checkout</h2>
      <Link href="/auth/login" className="bg-orange-500 text-white px-6 py-2 rounded-sm font-semibold hover:bg-orange-600 transition">Login</Link>
    </div>
  );

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        items: items.map((i) => ({ product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.quantity })),
        shippingAddress: { fullName: form.fullName, address: form.address, city: form.city, postalCode: form.postalCode, country: form.country, phone: form.phone },
        paymentMethod: form.paymentMethod,
        itemsPrice: total,
        shippingPrice: shipping,
        totalPrice: grandTotal,
      };
      const { data } = await createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/orders/${data._id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form */}
          <div className="flex-1 space-y-6">
            <div className="bg-white border border-gray-100 rounded p-6">
              <h2 className="font-bold text-gray-800 mb-4 text-lg">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", full: true },
                  { name: "address", label: "Street Address", type: "text", placeholder: "123 Wood Street", full: true },
                  { name: "city", label: "City", type: "text", placeholder: "Islamabad" },
                  { name: "postalCode", label: "Postal Code", type: "text", placeholder: "44000" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+92-300-1234567" },
                ].map(({ name, label, type, placeholder, full }) => (
                  <div key={name} className={full ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
                    <input
                      type={type} name={name} required placeholder={placeholder}
                      value={(form as any)[name]} onChange={handleChange}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400 transition"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select name="country" value={form.country} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400">
                    {["Pakistan","United Kingdom","United States","Canada","Australia","UAE","Saudi Arabia"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded p-6">
              <h2 className="font-bold text-gray-800 mb-4 text-lg">Payment Method</h2>
              <div className="space-y-3">
                {[{ value: "COD", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                  { value: "Bank Transfer", label: "Bank Transfer", desc: "Direct bank transfer" }].map(({ value, label, desc }) => (
                  <label key={value} className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition ${form.paymentMethod === value ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="paymentMethod" value={value} checked={form.paymentMethod === value} onChange={handleChange} className="accent-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white border border-gray-100 rounded p-5 sticky top-4">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100"} alt={item.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>£{total.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2"><span>Total</span><span>£{grandTotal.toFixed(2)}</span></div>
              </div>
              <button type="submit" disabled={loading} className="mt-4 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-sm font-semibold transition text-sm">
                {loading ? "Placing Order..." : "Place Order"}
              </button>
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-400">
                <ShieldCheck size={12} /> Secure & Encrypted Checkout
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
