"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrder } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, Truck, Package } from "lucide-react";

const steps = ["Pending", "Processing", "Shipped", "Delivered"];
const statusColors: Record<string, string> = {
  Pending: "text-yellow-600", Processing: "text-blue-600",
  Shipped: "text-purple-600", Delivered: "text-green-600", Cancelled: "text-red-500",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id).then((r) => setOrder(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><div className="animate-pulse text-gray-400">Loading order...</div></div>;
  if (!order) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Order not found</div>;

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle size={28} className="text-green-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-sm text-gray-500">Order #{order._id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      {/* Progress Steps */}
      {order.status !== "Cancelled" && (
        <div className="bg-white border border-gray-100 rounded p-5 mb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            <div className="absolute top-4 left-0 h-0.5 bg-orange-500 z-0 transition-all" style={{ width: `${Math.max(0, (currentStep / (steps.length - 1)) * 100)}%` }} />
            {steps.map((step, i) => (
              <div key={step} className="relative z-10 flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${i <= currentStep ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-200 text-gray-400"}`}>
                  {i < currentStep ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs font-medium ${i <= currentStep ? "text-orange-600" : "text-gray-400"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-gray-100 rounded p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100"} alt={item.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Shipping Address</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-800">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>£{order.itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{order.shippingPrice === 0 ? "Free" : `£${order.shippingPrice.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-gray-900 border-t pt-2"><span>Total</span><span>£{order.totalPrice.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded p-5 text-sm">
            <p className="font-medium text-gray-700 mb-1">Payment Method</p>
            <p className="text-gray-500">{order.paymentMethod}</p>
            <p className={`mt-2 font-medium ${statusColors[order.status]}`}>Status: {order.status}</p>
          </div>
          <Link href="/orders" className="block text-center text-orange-500 hover:underline text-sm">← Back to My Orders</Link>
        </div>
      </div>
    </div>
  );
}
