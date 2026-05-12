import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'About Us – AquaLux' };

const stats = [
  { value: '18+', label: 'Years of Experience' },
  { value: '5,000+', label: 'Happy Customers' },
  { value: '200+', label: 'Products Available' },
  { value: '50+', label: 'Expert Team Members' },
];

const team = [
  { name: 'James Carter', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&facepad=3&faces=1' },
  { name: 'Sarah Mitchell', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' },
  { name: 'David Park', role: 'Lead Technician', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
];

export default function About() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">About AquaLux</h1>
          <p className="text-lg opacity-85 max-w-xl mx-auto">
            Dedicated to bringing the finest hot tubs and swim spas to homes around the world since 2005.
          </p>
        </div>
      </div>

      {/* OUR STORY */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Founded in 2005 by passionate spa enthusiasts, AquaLux started with a simple mission: to make premium hydrotherapy accessible to every home. What began as a small showroom in New York has grown into one of North America&apos;s most trusted hot tub retailers.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                We partner exclusively with manufacturers who share our commitment to quality, innovation, and sustainability. Every product we carry has been personally tested and approved by our expert team.
              </p>
              <Link href="/shop" className="bg-accent text-white px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all">
                Explore Products <i className="bi bi-arrow-right" />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=500&fit=crop"
                alt="About AquaLux"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-white py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold text-accent mb-2">{s.value}</div>
              <div className="text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 bg-lightbg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-2">Our Mission & Values</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-3 rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'bi-gem', title: 'Premium Quality', desc: 'We source only the finest hot tubs and accessories — built to last, designed to impress.' },
              { icon: 'bi-people', title: 'Customer First', desc: 'Your satisfaction drives everything we do, from showroom visits to after-sale support.' },
              { icon: 'bi-leaf', title: 'Sustainability', desc: 'Eco-friendly products and practices form the core of how we do business.' },
            ].map((v) => (
              <div key={v.title} className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                  <i className={`bi ${v.icon}`} />
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-2">Meet Our Team</h2>
            <p className="text-gray-500">The passionate people behind AquaLux</p>
            <div className="w-16 h-1 bg-accent mx-auto mt-3 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((t) => (
              <div key={t.name} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-accent/30">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-dark">{t.name}</h4>
                <p className="text-secondary text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
