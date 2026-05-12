import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = { title: 'Order Details – AquaLux' };

const sideLinks = [
  { href: '/account', label: 'Dashboard', icon: 'bi-grid' },
  { href: '/account/edit', label: 'Edit Profile', icon: 'bi-person' },
  { href: '/account/billing', label: 'Billing Address', icon: 'bi-credit-card' },
  { href: '/account/shipping', label: 'Shipping Address', icon: 'bi-truck' },
  { href: '/account/orders', label: 'My Orders', icon: 'bi-bag', active: true },
  { href: '/login', label: 'Logout', icon: 'bi-box-arrow-right' },
];

const trackingSteps = [
  { label: 'Order Placed', date: 'Dec 10, 2024', done: true },
  { label: 'Processing', date: 'Dec 11, 2024', done: true },
  { label: 'Shipped', date: 'Dec 13, 2024', done: true },
  { label: 'Out for Delivery', date: 'Dec 15, 2024', done: false },
  { label: 'Delivered', date: 'Expected Dec 16', done: false },
];

export default function OrderDetails() {
  return (
    <>
      <Navbar />
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Order Details</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <Link href="/account" className="hover:text-accent transition">Account</Link>
            <span>/</span><span>Order #AL-2024-001</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-primary p-6 text-white text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-person-fill text-4xl" />
                </div>
                <h4 className="font-bold text-lg">John Doe</h4>
                <p className="text-white/70 text-sm">john@example.com</p>
              </div>
              <nav className="p-3">
                {sideLinks.map((l) => (
                  <Link key={l.href} href={l.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition mb-1 ${l.active ? 'bg-accent/10 text-accent' : 'text-gray-600 hover:bg-lightbg hover:text-primary'}`}>
                    <i className={`bi ${l.icon}`} />{l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 space-y-6">
            {/* ORDER HEADER */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-primary text-xl">Order #AL-2024-001</h3>
                <p className="text-gray-500 text-sm mt-1">Placed on December 10, 2024 at 2:35 PM</p>
              </div>
              <div className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">Shipped</span>
                <button className="border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition">
                  <i className="bi bi-download" /> Invoice
                </button>
              </div>
            </div>

            {/* TRACKING */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-primary text-lg mb-6">Order Tracking</h4>
              <div className="flex items-start justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
                <div className="absolute top-4 left-0 w-3/5 h-0.5 bg-accent z-0" />
                {trackingSteps.map((step) => (
                  <div key={step.label} className="flex flex-col items-center z-10 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${step.done ? 'bg-accent text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {step.done ? <i className="bi bi-check" /> : '○'}
                    </div>
                    <p className={`text-xs font-semibold text-center ${step.done ? 'text-dark' : 'text-gray-400'}`}>{step.label}</p>
                    <p className="text-xs text-gray-400 text-center mt-0.5 hidden sm:block">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ITEMS */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-primary text-lg mb-4">Items Ordered</h4>
              {[
                { name: 'Serenity 6-Person Hot Tub', variant: 'Midnight Blue', price: '$4,299', qty: 1, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=160&fit=crop' },
                { name: 'Premium Insulated Spa Cover', variant: 'Standard', price: '$349', qty: 1, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=160&fit=crop' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-lightbg flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-dark text-sm">{item.name}</h5>
                    <p className="text-xs text-gray-400">{item.variant} · Qty: {item.qty}</p>
                  </div>
                  <span className="font-bold text-primary">{item.price}</span>
                </div>
              ))}
              <div className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>$4,648</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-600 font-semibold">FREE</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax</span><span>$372</span></div>
                <div className="flex justify-between font-bold text-dark text-base border-t pt-3"><span>Total</span><span className="text-primary">$5,020</span></div>
              </div>
            </div>

            {/* ADDRESSES */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Shipping Address', icon: 'bi-truck', addr: 'John Doe\n123 Main Street, Apt 4B\nNew York, NY 10001\nUnited States' },
                { title: 'Billing Address', icon: 'bi-credit-card', addr: 'John Doe\n123 Main Street, Apt 4B\nNew York, NY 10001\nUnited States' },
              ].map((a) => (
                <div key={a.title} className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-bold text-primary text-lg mb-3 flex items-center gap-2">
                    <i className={`bi ${a.icon} text-secondary`} />{a.title}
                  </h4>
                  {a.addr.split('\n').map((line, i) => (
                    <p key={i} className={`text-sm ${i === 0 ? 'font-semibold text-dark' : 'text-gray-500'}`}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
