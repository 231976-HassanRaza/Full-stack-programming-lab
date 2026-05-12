import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Register – AquaLux' };

export default function Register() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-1">Create Account</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span><span>Register</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-lightbg min-h-[60vh] flex items-center">
        <div className="max-w-lg w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="bi bi-person-plus-fill text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Join AquaLux</h2>
              <p className="text-gray-500 text-sm mt-1">Create your free account today</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-dark mb-1 block">First Name</label>
                  <input type="text" placeholder="John"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark mb-1 block">Last Name</label>
                  <input type="text" placeholder="Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Email Address</label>
                <div className="relative">
                  <i className="bi bi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Phone Number</label>
                <div className="relative">
                  <i className="bi bi-telephone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" placeholder="+1 (000) 000-0000"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Password</label>
                <div className="relative">
                  <i className="bi bi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" placeholder="Min. 8 characters"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Confirm Password</label>
                <div className="relative">
                  <i className="bi bi-lock-fill absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" placeholder="Re-enter your password"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-secondary mt-0.5" />
                <span>I agree to the{' '}
                  <Link href="/terms" className="text-secondary hover:text-primary">Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link href="/terms" className="text-secondary hover:text-primary">Privacy Policy</Link>
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-secondary" />
                Subscribe to our newsletter for deals &amp; updates
              </label>

              <Link href="/account" className="block w-full bg-accent text-white text-center py-3 rounded-lg font-bold hover:bg-orange-400 transition">
                Create Account
              </Link>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-secondary font-semibold hover:text-primary transition">Sign In</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
