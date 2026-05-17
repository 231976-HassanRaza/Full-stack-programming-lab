"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) { router.push("/"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded shadow-sm border border-gray-100 w-full max-w-md p-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-gray-900">Rustik</span>
            <span className="text-orange-500 text-sm font-medium ml-1 uppercase tracking-widest">Plank</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Sign In to Your Account</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Please enter your details.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-2.5 rounded font-semibold text-sm transition">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-orange-500 font-medium hover:underline">Register here</Link>
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          Demo admin: admin@rustikplank.com / admin123
        </div>
      </div>
    </div>
  );
}
