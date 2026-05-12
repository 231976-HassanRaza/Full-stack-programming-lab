import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = { title: 'Edit Profile – AquaLux' };

const sideLinks = [
  { href: '/account', label: 'Dashboard', icon: 'bi-grid' },
  { href: '/account/edit', label: 'Edit Profile', icon: 'bi-person', active: true },
  { href: '/account/billing', label: 'Billing Address', icon: 'bi-credit-card' },
  { href: '/account/shipping', label: 'Shipping Address', icon: 'bi-truck' },
  { href: '/account/orders', label: 'My Orders', icon: 'bi-bag' },
  { href: '/login', label: 'Logout', icon: 'bi-box-arrow-right' },
];

export default function EditAccount() {
  return (
    <>
      <Navbar />
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Edit Profile</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <Link href="/account" className="hover:text-accent transition">Account</Link>
            <span>/</span><span>Edit Profile</span>
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
              <h3 className="font-bold text-primary text-xl mb-6">Personal Information</h3>

              {/* Avatar */}
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl">
                  <i className="bi bi-person-fill" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark">Profile Photo</h4>
                  <p className="text-gray-400 text-sm mb-2">JPG, PNG or GIF. Max 2MB.</p>
                  <button className="bg-secondary text-white text-sm px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
                    Upload Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {[
                  { label: 'First Name', val: 'John', type: 'text' },
                  { label: 'Last Name', val: 'Doe', type: 'text' },
                  { label: 'Email Address', val: 'john@example.com', type: 'email' },
                  { label: 'Phone Number', val: '+1 (555) 123-4567', type: 'tel' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-sm font-semibold text-dark mb-1 block">{f.label}</label>
                    <input type={f.type} defaultValue={f.val}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-primary text-xl mb-5 pt-4 border-t border-gray-100">Change Password</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                  <div key={label}>
                    <label className="text-sm font-semibold text-dark mb-1 block">{label}</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button className="bg-accent text-white px-7 py-3 rounded-lg font-bold hover:bg-orange-400 transition">
                  Save Changes
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
