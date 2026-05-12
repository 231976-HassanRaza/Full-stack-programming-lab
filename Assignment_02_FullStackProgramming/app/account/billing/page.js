import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = { title: 'Billing Address – AquaLux' };

const sideLinks = [
  { href: '/account', label: 'Dashboard', icon: 'bi-grid' },
  { href: '/account/edit', label: 'Edit Profile', icon: 'bi-person' },
  { href: '/account/billing', label: 'Billing Address', icon: 'bi-credit-card', active: true },
  { href: '/account/shipping', label: 'Shipping Address', icon: 'bi-truck' },
  { href: '/account/orders', label: 'My Orders', icon: 'bi-bag' },
  { href: '/login', label: 'Logout', icon: 'bi-box-arrow-right' },
];

const fields = [
  { label: 'First Name', val: 'John', type: 'text', col: 1 },
  { label: 'Last Name', val: 'Doe', type: 'text', col: 1 },
  { label: 'Company (Optional)', val: '', type: 'text', col: 2 },
  { label: 'Address Line 1', val: '123 Main Street', type: 'text', col: 2 },
  { label: 'Address Line 2', val: 'Apt 4B', type: 'text', col: 2 },
  { label: 'City', val: 'New York', type: 'text', col: 1 },
  { label: 'State / Province', val: 'NY', type: 'text', col: 1 },
  { label: 'ZIP / Postal Code', val: '10001', type: 'text', col: 1 },
  { label: 'Phone', val: '+1 (555) 123-4567', type: 'tel', col: 1 },
];

export default function EditBilling() {
  return (
    <>
      <Navbar />
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Billing Address</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <Link href="/account" className="hover:text-accent transition">Account</Link>
            <span>/</span><span>Billing</span>
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

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <i className="bi bi-credit-card" />
                </div>
                <h3 className="font-bold text-primary text-xl">Billing Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {fields.map((f) => (
                  <div key={f.label} className={f.col === 2 ? 'sm:col-span-2' : ''}>
                    <label className="text-sm font-semibold text-dark mb-1 block">{f.label}</label>
                    <input type={f.type} defaultValue={f.val} placeholder={`Enter ${f.label.toLowerCase()}`}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-dark mb-1 block">Country</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary transition">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Pakistan</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-accent text-white px-7 py-3 rounded-lg font-bold hover:bg-orange-400 transition">
                  Save Address
                </button>
                <Link href="/account" className="border-2 border-gray-300 text-gray-600 px-7 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
