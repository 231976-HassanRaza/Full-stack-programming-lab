import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Order Confirmed – AquaLux' };

export default function OrderSummary() {
  return (
    <>
      <Navbar />

      <section className="py-16 bg-lightbg min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4">
          {/* SUCCESS BANNER */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <i className="bi bi-check-circle-fill text-green-500 text-4xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-4">
              Thank you for your purchase, <span className="font-semibold text-dark">John</span>! 🎉
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold">
              <i className="bi bi-bag-check" /> Order #AL-2024-003
            </div>
          </div>

          {/* ORDER DETAILS */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h3 className="font-bold text-primary text-xl mb-5">Order Summary</h3>

            {[
              { name: 'Serenity 6-Person Hot Tub', variant: 'Midnight Blue', price: '$4,299', qty: 1, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=160&fit=crop' },
              { name: 'Premium Insulated Spa Cover', variant: 'Standard', price: '$349', qty: 1, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=160&fit=crop' },
            ].map((item) => (
              <div key={item.name} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-lightbg flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <h5 className="font-semibold text-dark text-sm">{item.name}</h5>
                    <p className="text-xs text-gray-400">{item.variant} · Qty: {item.qty}</p>
                  </div>
                  <span className="font-bold text-primary text-sm">{item.price}</span>
                </div>
              </div>
            ))}

            <div className="pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>$4,648</span></div>
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-600 font-semibold">FREE</span></div>
              <div className="flex justify-between text-gray-500"><span>Tax (8%)</span><span>$372</span></div>
              <div className="flex justify-between font-bold text-dark text-base border-t pt-3">
                <span>Total Paid</span>
                <span className="text-primary text-lg">$5,020</span>
              </div>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-5">
              <h4 className="font-bold text-primary text-sm mb-2 flex items-center gap-2">
                <i className="bi bi-truck text-secondary" /> Shipping To
              </h4>
              <p className="text-sm text-gray-600">John Doe</p>
              <p className="text-sm text-gray-500">123 Main Street, Apt 4B</p>
              <p className="text-sm text-gray-500">New York, NY 10001</p>
              <p className="text-xs text-secondary mt-2 font-medium">
                <i className="bi bi-clock" /> Estimated: 3–5 Business Days
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <h4 className="font-bold text-primary text-sm mb-2 flex items-center gap-2">
                <i className="bi bi-credit-card text-secondary" /> Payment Method
              </h4>
              <div className="flex items-center gap-2 mb-1">
                <i className="bi bi-credit-card-2-front text-gray-400" />
                <span className="text-sm text-gray-600">Visa ending in ••••4567</span>
              </div>
              <p className="text-sm text-gray-500">Charged: $5,020.00</p>
              <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                <i className="bi bi-shield-check" /> Payment Successful
              </p>
            </div>
          </div>

          {/* EMAIL NOTE */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center mb-6">
            <i className="bi bi-envelope-check text-secondary text-2xl mb-2" />
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to{' '}
              <span className="font-semibold text-dark">john@example.com</span>
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/account/orders" className="flex-1 bg-primary text-white text-center py-3 rounded-lg font-bold hover:bg-opacity-90 transition flex items-center justify-center gap-2">
              <i className="bi bi-bag" /> View My Orders
            </Link>
            <Link href="/shop" className="flex-1 border-2 border-primary text-primary text-center py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
              <i className="bi bi-arrow-left" /> Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
