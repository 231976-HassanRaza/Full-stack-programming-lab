"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4"/>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-6">Add some beautiful furniture to your cart!</p>
      <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-semibold transition">Continue Shopping</Link>
    </div>
  );

  const shipping = total >= 50 ? 0 : 9.99;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({items.length} items)</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white border border-gray-100 rounded overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            {items.map((item) => (
              <div key={item._id} className="grid grid-cols-12 gap-2 px-4 py-4 border-b border-gray-50 items-center">
                <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image src={item.image||"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200"} alt={item.name} fill className="object-cover" unoptimized/>
                  </div>
                  <div>
                    <Link href={`/products/${item._id}`} className="font-medium text-gray-800 hover:text-orange-500 text-sm line-clamp-2">{item.name}</Link>
                    <button onClick={() => removeFromCart(item._id)} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 mt-1 transition"><Trash2 size={12}/>Remove</button>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-center text-sm font-medium text-gray-700">£{item.price.toFixed(2)}</div>
                <div className="col-span-5 md:col-span-3 flex items-center justify-center">
                  <div className="flex items-center border border-gray-200 rounded-sm">
                    <button onClick={() => updateQty(item._id, item.quantity-1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"><Minus size={12}/></button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, item.quantity+1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"><Plus size={12}/></button>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-2 text-right font-semibold text-gray-900 text-sm">£{(item.price*item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Link href="/products" className="text-orange-500 hover:underline text-sm flex items-center gap-1">← Continue Shopping</Link>
            <button onClick={clearCart} className="text-red-400 hover:text-red-500 text-sm flex items-center gap-1 transition"><Trash2 size={14}/>Clear Cart</button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white border border-gray-100 rounded p-5">
            <h2 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>£{total.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping===0?"Free":`£${shipping.toFixed(2)}`}</span></div>
              {shipping>0 && <p className="text-xs text-orange-500">Add £{(50-total).toFixed(2)} more for free shipping!</p>}
              <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-base"><span>Total</span><span>£{grandTotal.toFixed(2)}</span></div>
            </div>
            <Link href="/checkout" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-sm font-semibold transition">
              Proceed to Checkout
            </Link>
            <p className="text-xs text-gray-400 text-center mt-3">Secure checkout powered by SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
