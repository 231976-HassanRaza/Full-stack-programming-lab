import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Checkout – AquaLux' };

export default function Checkout() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Checkout</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-accent transition">Cart</Link>
            <span>/</span>
            <span>Checkout</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* STEPS */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[{ n: 1, label: 'Cart' }, { n: 2, label: 'Details' }, { n: 3, label: 'Payment' }, { n: 4, label: 'Confirm' }].map((step, i) => (
              <div key={step.n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step.n === 2 ? 'bg-accent text-white' : step.n < 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step.n < 2 ? <i className="bi bi-check" /> : step.n}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step.n === 2 ? 'text-accent' : 'text-gray-400'}`}>{step.label}</span>
                {i < 3 && <i className="bi bi-chevron-right text-gray-300 text-xs" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT: FORM */}
            <div className="flex-1 space-y-6">

              {/* Billing */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-primary text-xl mb-5 flex items-center gap-2">
                  <i className="bi bi-geo-alt" /> Billing Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['First Name', 'text'], ['Last Name', 'text'], ['Email Address', 'email'], ['Phone Number', 'tel'], ['Address', 'text'], ['City', 'text'], ['State / Province', 'text'], ['ZIP Code', 'text']].map(([label, type]) => (
                    <div key={label} className={label === 'Address' ? 'sm:col-span-2' : ''}>
                      <label className="text-sm font-semibold text-dark mb-1 block">{label}</label>
                      <input type={type} placeholder={`Enter ${label.toLowerCase()}`}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-dark mb-1 block">Country</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Pakistan</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-4 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="accent-secondary" />
                  Ship to a different address
                </label>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-primary text-xl mb-5 flex items-center gap-2">
                  <i className="bi bi-credit-card" /> Payment Method
                </h3>
                <div className="space-y-3 mb-5">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: 'bi-credit-card-2-front' },
                    { id: 'paypal', label: 'PayPal', icon: 'bi-paypal' },
                    { id: 'bank', label: 'Bank Transfer', icon: 'bi-bank' },
                  ].map((m, i) => (
                    <label key={m.id} className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:border-secondary transition">
                      <input type="radio" name="payment" defaultChecked={i === 0} className="accent-secondary" />
                      <i className={`bi ${m.icon} text-secondary text-lg`} />
                      <span className="text-sm font-medium text-dark">{m.label}</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-dark mb-1 block">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark mb-1 block">Expiry Date</label>
                    <input type="text" placeholder="MM / YY"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark mb-1 block">CVV</label>
                    <input type="text" placeholder="•••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-primary text-xl mb-5">Order Summary</h3>
                {[
                  { name: 'Serenity 6-Person Hot Tub', price: '$4,299', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=100&h=80&fit=crop' },
                  { name: 'Premium Spa Cover', price: '$349', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=80&fit=crop' },
                ].map((item) => (
                  <div key={item.name} className="flex gap-3 mb-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-lightbg flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between items-start">
                      <span className="text-xs text-dark font-medium">{item.name}</span>
                      <span className="text-xs font-bold text-primary">{item.price}</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>$4,648</span></div>
                  <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-600 font-semibold">FREE</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax</span><span>$372</span></div>
                  <div className="flex justify-between font-bold text-dark text-base border-t pt-2">
                    <span>Total</span><span className="text-primary">$5,020</span>
                  </div>
                </div>
                <Link href="/order-summary" className="block w-full bg-accent text-white text-center py-3 rounded-lg font-bold mt-5 hover:bg-orange-400 transition">
                  Place Order <i className="bi bi-bag-check" />
                </Link>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
                  <i className="bi bi-lock-fill text-green-500" />
                  256-bit SSL Secure Payment
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
