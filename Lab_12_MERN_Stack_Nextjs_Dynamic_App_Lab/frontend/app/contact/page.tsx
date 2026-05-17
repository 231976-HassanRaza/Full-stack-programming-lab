"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-400">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Get in Touch</h2>
          {[
            { icon: MapPin, title: "Our Location", info: "123 Wood Street, Islamabad, Pakistan 44000" },
            { icon: Phone, title: "Phone Number", info: "+92-300-1234567\n+92-51-2345678" },
            { icon: Mail, title: "Email Address", info: "info@rustikplank.com\nsupport@rustikplank.com" },
            { icon: Clock, title: "Working Hours", info: "Mon - Sat: 9:00 AM - 6:00 PM\nSun: Closed" },
          ].map(({ icon: Icon, title, info }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={18} className="text-orange-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-0.5">{title}</p>
                <p className="text-gray-500 text-sm whitespace-pre-line">{info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-100 rounded p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 transition resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-8 py-3 rounded-sm font-semibold text-sm transition">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
