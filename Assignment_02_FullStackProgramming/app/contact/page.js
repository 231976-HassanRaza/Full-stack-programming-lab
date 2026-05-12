import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Contact Us – AquaLux' };

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-1">Contact Us</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span><span>Contact</span>
          </div>
        </div>
      </div>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: 'bi-telephone', title: 'Phone', lines: ['+1 (800) 275-2835', 'Mon–Fri 9am–6pm'] },
              { icon: 'bi-envelope', title: 'Email', lines: ['support@aqualux.com', 'sales@aqualux.com'] },
              { icon: 'bi-geo-alt', title: 'Showroom', lines: ['123 Spa Blvd, New York', 'NY 10001, USA'] },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-xl shadow-md p-8 text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                  <i className={`bi ${c.icon}`} />
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">{c.title}</h4>
                {c.lines.map((l) => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* FORM */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Send a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-dark mb-1 block">First Name</label>
                    <input type="text" placeholder="John" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark mb-1 block">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark mb-1 block">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark mb-1 block">Subject</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary transition">
                    <option>General Inquiry</option>
                    <option>Product Question</option>
                    <option>Order Support</option>
                    <option>Return / Warranty</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark mb-1 block">Message</label>
                  <textarea rows={5} placeholder="Write your message here..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition resize-none" />
                </div>
                <button className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-orange-400 transition inline-flex items-center justify-center gap-2">
                  <i className="bi bi-send" /> Send Message
                </button>
              </div>
            </div>

            {/* MAP PLACEHOLDER */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <div className="w-full h-full min-h-80 bg-lightbg flex flex-col items-center justify-center gap-3 text-center p-8">
                <i className="bi bi-map text-5xl text-secondary" />
                <h4 className="text-xl font-bold text-primary">Find Our Showroom</h4>
                <p className="text-gray-500 text-sm">123 Spa Blvd, New York, NY 10001, USA</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="bg-secondary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition">
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
