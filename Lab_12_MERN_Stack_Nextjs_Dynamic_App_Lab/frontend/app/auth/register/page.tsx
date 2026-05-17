"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) { router.push("/"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
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
          <h1 className="text-xl font-bold text-gray-900">Create Your Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join Rustik Plank and explore handcrafted furniture.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type} required value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input type="password" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Repeat password"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-2.5 rounded font-semibold text-sm transition">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-orange-500 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
