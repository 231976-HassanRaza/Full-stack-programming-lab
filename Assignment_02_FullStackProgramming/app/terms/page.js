import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Terms & Conditions – AquaLux' };

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using the AquaLux website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
  },
  {
    title: '2. Products & Pricing',
    content: 'All products listed on AquaLux are subject to availability. Prices are listed in USD and are subject to change without notice. We reserve the right to modify or discontinue any product without prior notice.',
  },
  {
    title: '3. Orders & Payment',
    content: 'By placing an order, you warrant that you are legally capable of entering into binding contracts. Payment must be received in full before orders are processed. We accept major credit cards, PayPal, and bank transfers.',
  },
  {
    title: '4. Shipping & Delivery',
    content: 'Delivery timelines are estimates only and are not guaranteed. AquaLux offers free white-glove delivery on qualifying orders. We are not responsible for delays caused by external shipping providers or circumstances beyond our control.',
  },
  {
    title: '5. Returns & Refunds',
    content: 'We offer a 30-day return policy on most items. Products must be returned in original, undamaged condition. Custom or special-order items may not be eligible for return. Refunds are processed within 5–10 business days.',
  },
  {
    title: '6. Warranty',
    content: 'AquaLux hot tubs come with a 5-year manufacturer warranty covering defects in materials and workmanship. The warranty does not cover damage resulting from improper installation, misuse, or neglect.',
  },
  {
    title: '7. Privacy Policy',
    content: 'We are committed to protecting your privacy. Your personal information is collected only for the purpose of processing orders and improving our service. We do not sell or share your data with third parties except as required to fulfil your order.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'AquaLux shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the amount paid for the product in question.',
  },
  {
    title: '9. Changes to Terms',
    content: 'AquaLux reserves the right to update these terms at any time. Continued use of the site following any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.',
  },
  {
    title: '10. Contact',
    content: 'For questions regarding these terms, please contact us at legal@aqualux.com or call +1 (800) 275-2835 during business hours.',
  },
];

export default function Terms() {
  return (
    <>
      <Navbar />

      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-1">Terms &amp; Conditions</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span><span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="flex items-center gap-3 mb-2">
              <i className="bi bi-file-text text-secondary text-2xl" />
              <h2 className="text-2xl font-bold text-primary">AquaLux Terms &amp; Conditions</h2>
            </div>
            <p className="text-gray-400 text-sm mb-8">Last updated: December 2024</p>

            <div className="bg-blue-50 border-l-4 border-secondary rounded-r-xl p-5 mb-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Please read these terms and conditions carefully before using our website or purchasing any products. By using AquaLux services, you agree to these terms in full.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.title} className="border-b border-gray-100 pb-8 last:border-0">
                  <h3 className="font-bold text-primary text-lg mb-3">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{s.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Link href="/register" className="flex-1 bg-accent text-white text-center py-3 rounded-lg font-bold hover:bg-orange-400 transition">
                I Accept — Create Account
              </Link>
              <Link href="/" className="flex-1 border-2 border-gray-300 text-gray-600 text-center py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
