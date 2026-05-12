import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'My Account – AquaLux' };

const orders = [
  { id: 'AL-2024-001', date: 'Dec 10, 2024', status: 'Delivered', total: '$4,648', items: 2 },
  { id: 'AL-2024-002', date: 'Nov 22, 2024', status: 'Processing', total: '$89', items: 1 },
  { id: 'AL-2023-098', date: 'Oct 5, 2023', status: 'Delivered', total: '$349', items: 1 },
];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const sideLinks = [
  { href: '/account', label: 'Dashboard', icon: 'bi-grid', active: true },
  { href: '/account/edit', label: 'Edit Profile', icon: 'bi-person' },
  { href: '/account/billing', label: 'Billing Address', icon: 'bi-credit-card' },
  { href: '/account/shipping', label: 'Shipping Address', icon: 'bi-truck' },
  { href: '/account/orders', label: 'My Orders', icon: 'bi-bag' },
  { href: '/login', label: 'Logout', icon: 'bi-box-arrow-right' },
];

export default function Account() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">My Account</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span><span>Account</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
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
                    <i className={`bi ${l.icon}`} />
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN */}
          <div className="flex-1 space-y-6">
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: 'bi-bag', label: 'Total Orders', value: '3', color: 'text-primary' },
                { icon: 'bi-check-circle', label: 'Delivered', value: '2', color: 'text-green-600' },
                { icon: 'bi-clock', label: 'Processing', value: '1', color: 'text-blue-600' },
                { icon: 'bi-star', label: 'Wishlist', value: '5', color: 'text-accent' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl shadow-md p-5 text-center">
                  <i className={`bi ${s.icon} text-2xl ${s.color}`} />
                  <div className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-primary text-xl">Recent Orders</h3>
                <Link href="/account/orders" className="text-secondary text-sm hover:text-primary transition">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wide">
                      <th className="pb-3 text-left font-medium">Order ID</th>
                      <th className="pb-3 text-left font-medium">Date</th>
                      <th className="pb-3 text-left font-medium">Status</th>
                      <th className="pb-3 text-left font-medium">Total</th>
                      <th className="pb-3 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-lightbg transition">
                        <td className="py-3 font-semibold text-dark">{o.id}</td>
                        <td className="py-3 text-gray-500">{o.date}</td>
                        <td className="py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[o.status]}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3 font-semibold text-primary">{o.total}</td>
                        <td className="py-3">
                          <Link href="/account/orders" className="text-secondary text-xs hover:text-primary transition font-semibold">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { href: '/account/edit', icon: 'bi-person-gear', label: 'Edit Profile', desc: 'Update your info' },
                { href: '/account/billing', icon: 'bi-credit-card', label: 'Billing Address', desc: 'Manage billing' },
                { href: '/account/shipping', icon: 'bi-truck', label: 'Shipping Address', desc: 'Manage delivery' },
              ].map((q) => (
                <Link key={q.href} href={q.href}
                  className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">
                    <i className={`bi ${q.icon}`} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-dark text-sm">{q.label}</h5>
                    <p className="text-xs text-gray-400">{q.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
