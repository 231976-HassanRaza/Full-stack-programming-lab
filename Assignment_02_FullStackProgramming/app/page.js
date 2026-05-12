import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  { icon: 'bi-truck', title: 'Free Delivery', sub: 'On orders over $1,000' },
  { icon: 'bi-shield-check', title: '5-Year Warranty', sub: 'Full coverage guarantee' },
  { icon: 'bi-headset', title: '24/7 Support', sub: 'Always here to help' },
  { icon: 'bi-arrow-return-left', title: '30-Day Returns', sub: 'Hassle-free returns' },
];

const categories = [
  { label: 'Hot Tubs', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop' },
  { label: 'Swim Spas', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
  { label: 'Accessories', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop' },
  { label: 'Chemicals & Care', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop' },
];

const products = [
  { name: 'Serenity 6-Person Hot Tub', price: '$4,299', old: '$5,199', badge: 'New', stars: 5, reviews: 42, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop' },
  { name: 'Cascade Swim Spa 14ft', price: '$8,999', old: '$11,500', badge: 'Sale', stars: 4, reviews: 28, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop' },
  { name: 'Premium Insulated Spa Cover', price: '$349', old: null, badge: null, stars: 5, reviews: 85, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=400&fit=crop' },
  { name: 'All-Season Chemical Kit', price: '$89', old: '$119', badge: 'New', stars: 4, reviews: 61, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=400&fit=crop' },
];

function Stars({ count }) {
  return (
    <span className="text-yellow-400">
      {[1,2,3,4,5].map(i => (
        <span key={i}>{i <= count ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400')] bg-center bg-cover opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight mb-5">
              Your Perfect <span className="text-accent">Backyard Escape</span> Awaits
            </h1>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Discover premium hot tubs, swim spas, and accessories. Elevate your relaxation experience with AquaLux — where luxury meets serenity.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/shop" className="bg-accent text-white px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                <i className="bi bi-grid" /> Shop Now
              </Link>
              <Link href="/about" className="border-2 border-white text-white px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-primary transition-all">
                <i className="bi bi-play-circle" /> Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-lightbg flex items-center justify-center text-primary text-xl flex-shrink-0">
                <i className={`bi ${f.icon}`} />
              </div>
              <div>
                <h5 className="font-semibold text-dark text-sm">{f.title}</h5>
                <p className="text-gray-500 text-xs">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-2">Shop By Category</h2>
            <p className="text-gray-500">Explore our range of premium spa products</p>
            <div className="w-16 h-1 bg-accent mx-auto mt-3 rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((c) => (
              <Link key={c.label} href="/shop" className="relative rounded-xl overflow-hidden group h-48 block">
                <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h4 className="text-white font-bold text-lg">{c.label}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-lightbg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-2">Featured Products</h2>
            <p className="text-gray-500">Best-selling hot tubs and spa essentials</p>
            <div className="w-16 h-1 bg-accent mx-auto mt-3 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {products.map((p) => (
              <div key={p.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
                <div className="relative h-52 overflow-hidden bg-lightbg">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  {p.badge && (
                    <span className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full ${p.badge === 'Sale' ? 'bg-secondary' : 'bg-accent'}`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-dark mb-1 text-sm leading-snug">{p.name}</h4>
                  <div className="flex items-center gap-1 mb-2 text-sm">
                    <Stars count={p.stars} />
                    <span className="text-gray-400 text-xs">({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary font-bold text-lg">{p.price}</span>
                    {p.old && <span className="text-gray-400 line-through text-sm">{p.old}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Link href="/product" className="flex-1 bg-secondary text-white text-center text-xs py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                      View Details
                    </Link>
                    <button className="bg-accent text-white px-3 py-2 rounded-lg text-xs hover:bg-orange-400 transition">
                      <i className="bi bi-cart-plus" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="bg-accent text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all">
              View All Products <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-3">
            Summer Sale — Up to <span className="text-accent">30% Off</span>
          </h2>
          <p className="text-white/80 mb-7 text-lg">
            Limited time offers on select hot tubs and swim spas. Don&apos;t miss out!
          </p>
          <Link href="/shop" className="bg-accent text-white px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-orange-400 transition">
            Shop the Sale <i className="bi bi-lightning" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
