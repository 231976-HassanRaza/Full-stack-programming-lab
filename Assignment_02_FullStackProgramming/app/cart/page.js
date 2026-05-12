import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Shopping Cart – AquaLux' };

const cartItems = [
  { name: 'Serenity 6-Person Hot Tub', variant: 'Midnight Blue', price: 4299, qty: 1, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=160&fit=crop' },
  { name: 'Premium Insulated Spa Cover', variant: 'Standard', price: 349, qty: 1, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=160&fit=crop' },
  { name: 'All-Season Chemical Kit', variant: 'Pack of 1', price: 89, qty: 2, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=160&fit=crop' },
];

const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
const shipping = 0;
const tax = Math.round(subtotal * 0.08);
const total = subtotal + shipping + tax;

export default function Cart() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Shopping Cart</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <span>Cart</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* CART ITEMS */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-lightbg px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="col-span-6">Product</span>
                  <span className="col-span-2 text-center">Price</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-center">Total</span>
                </div>

                {cartItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center px-6 py-5 border-b border-gray-100 last:border-0">
                    <div className="col-span-12 md:col-span-6 flex items-center gap-4 mb-3 md:mb-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-lightbg flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-dark text-sm">{item.name}</h5>
                        <p className="text-xs text-gray-400">{item.variant}</p>
                        <button className="text-xs text-red-500 hover:text-red-700 mt-1 transition">
                          <i className="bi bi-trash3" /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-center text-sm font-semibold text-primary">
                      ${item.price.toLocaleString()}
                    </div>
                    <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button className="px-2 py-1 text-gray-400 hover:text-primary text-sm">−</button>
                        <span className="px-3 py-1 text-sm font-semibold">{item.qty}</span>
                        <button className="px-2 py-1 text-gray-400 hover:text-primary text-sm">+</button>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-center font-bold text-dark text-sm">
                      ${(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                ))}

                <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Coupon code" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
                    <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition">Apply</button>
                  </div>
                  <Link href="/shop" className="text-secondary text-sm font-semibold hover:text-primary transition inline-flex items-center gap-1">
                    <i className="bi bi-arrow-left" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-primary text-xl mb-5">Order Summary</h3>
                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-semibold">${subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-semibold text-green-600">FREE</span></div>
                  <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span className="font-semibold">${tax.toLocaleString()}</span></div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-dark text-base">
                    <span>Total</span>
                    <span className="text-primary text-lg">${total.toLocaleString()}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block w-full bg-accent text-white text-center py-3 rounded-lg font-bold hover:bg-orange-400 transition">
                  Proceed to Checkout <i className="bi bi-arrow-right" />
                </Link>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                  <i className="bi bi-lock-fill text-green-500" />
                  Secure SSL Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
