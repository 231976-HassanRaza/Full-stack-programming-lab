import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Login – AquaLux' };

export default function Login() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-1">Login</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span><span>Login</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-lightbg min-h-[60vh] flex items-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="bi bi-person-fill text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in to your AquaLux account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Email Address</label>
                <div className="relative">
                  <i className="bi bi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Password</label>
                <div className="relative">
                  <i className="bi bi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input type="checkbox" className="accent-secondary" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-secondary hover:text-primary transition">
                  Forgot Password?
                </Link>
              </div>

              <Link href="/account" className="block w-full bg-accent text-white text-center py-3 rounded-lg font-bold hover:bg-orange-400 transition">
                Sign In
              </Link>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative text-center text-xs text-gray-400 bg-white px-3 w-fit mx-auto">or continue with</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="border border-gray-300 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-lightbg transition">
                  <i className="bi bi-google text-red-500" /> Google
                </button>
                <button className="border border-gray-300 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-lightbg transition">
                  <i className="bi bi-facebook text-blue-600" /> Facebook
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-secondary font-semibold hover:text-primary transition">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
