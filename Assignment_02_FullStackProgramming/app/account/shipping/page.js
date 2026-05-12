import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = { title: 'Shipping Address – AquaLux' };

const sideLinks = [
  { href: '/account', label: 'Dashboard', icon: 'bi-grid' },
  { href: '/account/edit', label: 'Edit Profile', icon: 'bi-person' },
  { href: '/account/billing', label: 'Billing Address', icon: 'bi-credit-card' },
  { href: '/account/shipping', label: 'Shipping Address', icon: 'bi-truck', active: true },
  { href: '/account/orders', label: 'My Orders', icon: 'bi-bag' },
  { href: '/login', label: 'Logout', icon: 'bi-box-arrow-right' },
];

export default function EditShipping() {
  return (
    <>
      <Navbar />
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Shipping Address</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <Link href="/account" className="hover:text-accent transition">Account</Link>
            <span>/</span><span>Shipping</span>
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
            {/* Saved Addresses */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-primary text-xl flex items-center gap-2">
                  <i className="bi bi-truck" /> Saved Addresses
                </h3>
                <button className="bg-accent text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition">
                  + Add New
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Home', addr: '123 Main Street, Apt 4B, New York, NY 10001, USA', default: true },
                  { label: 'Office', addr: '456 Park Ave, Suite 300, New York, NY 10022, USA', default: false },
                ].map((a) => (
                  <div key={a.label} className={`border-2 rounded-xl p-5 relative ${a.default ? 'border-accent' : 'border-gray-200'}`}>
                    {a.default && (
                      <span className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-0.5 rounded-full">Default</span>
                    )}
                    <h5 className="font-semibold text-dark mb-1 flex items-center gap-2">
                      <i className="bi bi-house text-secondary" />{a.label}
                    </h5>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{a.addr}</p>
                    <div className="flex gap-2">
                      <button className="text-secondary text-xs hover:text-primary transition font-medium">Edit</button>
                      <span className="text-gray-300">|</span>
                      {!a.default && <button className="text-secondary text-xs hover:text-primary transition font-medium">Set Default</button>}
                      {!a.default && <><span className="text-gray-300">|</span><button className="text-red-500 text-xs hover:text-red-700 transition font-medium">Remove</button></>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="font-bold text-primary text-xl mb-5">Add New Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'First Name', type: 'text', span: 1 },
                  { label: 'Last Name', type: 'text', span: 1 },
                  { label: 'Address Line 1', type: 'text', span: 2 },
                  { label: 'Address Line 2 (Optional)', type: 'text', span: 2 },
                  { label: 'City', type: 'text', span: 1 },
                  { label: 'State / Province', type: 'text', span: 1 },
                  { label: 'ZIP Code', type: 'text', span: 1 },
                  { label: 'Phone', type: 'tel', span: 1 },
                ].map((f) => (
                  <div key={f.label} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                    <label className="text-sm font-semibold text-dark mb-1 block">{f.label}</label>
                    <input type={f.type} placeholder={`Enter ${f.label.toLowerCase().replace(' (optional)', '')}`}
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
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-secondary" />
                    Set as default shipping address
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="bg-accent text-white px-7 py-3 rounded-lg font-bold hover:bg-orange-400 transition">Save Address</button>
                <Link href="/account" className="border-2 border-gray-300 text-gray-600 px-7 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition">Cancel</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
