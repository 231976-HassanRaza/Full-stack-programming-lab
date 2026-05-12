import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Forgot Password – AquaLux' };

export default function ForgotPassword() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-1">Forgot Password</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span><span>Forgot Password</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-lightbg min-h-[60vh] flex items-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="bi bi-key text-secondary text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Reset Password</h2>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-dark mb-1 block">Email Address</label>
                <div className="relative">
                  <i className="bi bi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
              </div>

              <button className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-orange-400 transition flex items-center justify-center gap-2">
                <i className="bi bi-send" /> Send Reset Link
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative text-center text-xs text-gray-400 bg-white px-3 w-fit mx-auto">or</div>
              </div>

              <Link href="/login" className="block w-full border-2 border-gray-300 text-gray-600 text-center py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition">
                <i className="bi bi-arrow-left" /> Back to Login
              </Link>
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
