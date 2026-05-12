import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Shop – AquaLux' };

const products = [
  { name: 'Serenity 6-Person Hot Tub', price: '$4,299', old: '$5,199', badge: 'New', stars: 5, reviews: 42, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop', category: 'Hot Tubs' },
  { name: 'Cascade Swim Spa 14ft', price: '$8,999', old: '$11,500', badge: 'Sale', stars: 4, reviews: 28, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop', category: 'Swim Spas' },
  { name: 'Premium Insulated Spa Cover', price: '$349', old: null, badge: null, stars: 5, reviews: 85, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=400&fit=crop', category: 'Accessories' },
  { name: 'All-Season Chemical Kit', price: '$89', old: '$119', badge: 'New', stars: 4, reviews: 61, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=400&fit=crop', category: 'Chemicals' },
  { name: 'AquaLux Elite 4-Person', price: '$3,499', old: null, badge: null, stars: 5, reviews: 33, img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop', category: 'Hot Tubs' },
  { name: 'Spa Booster Seat', price: '$129', old: '$179', badge: 'Sale', stars: 4, reviews: 19, img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&h=400&fit=crop', category: 'Accessories' },
  { name: 'Luxury 8-Person Hot Tub', price: '$12,999', old: null, badge: 'New', stars: 5, reviews: 14, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop&sat=-50', category: 'Hot Tubs' },
  { name: 'Water Sanitizer Pack', price: '$45', old: '$59', badge: null, stars: 4, reviews: 97, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=400&fit=crop', category: 'Chemicals' },
];

function Stars({ count }) {
  return (
    <span className="text-yellow-400">
      {[1,2,3,4,5].map(i => <span key={i}>{i <= count ? '★' : '☆'}</span>)}
    </span>
  );
}

export default function Shop() {
  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-1">Shop All Products</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <span>/</span>
            <span>Shop</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* SIDEBAR FILTERS */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-6 mb-5">
                <h4 className="font-bold text-primary mb-4">Categories</h4>
                {['All Products', 'Hot Tubs', 'Swim Spas', 'Accessories', 'Chemicals'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer text-sm text-gray-600 hover:text-primary transition">
                    <input type="checkbox" defaultChecked={cat === 'All Products'} className="accent-secondary" />
                    {cat}
                  </label>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-5">
                <h4 className="font-bold text-primary mb-4">Price Range</h4>
                <input type="range" min="0" max="15000" defaultValue="15000" className="w-full accent-secondary" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span><span>$15,000</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="font-bold text-primary mb-4">Rating</h4>
                {[5,4,3].map((r) => (
                  <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer text-sm text-yellow-400">
                    <input type="checkbox" className="accent-secondary" />
                    {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                  </label>
                ))}
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">Showing {products.length} products</p>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-secondary">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div key={p.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-lightbg">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      {p.badge && (
                        <span className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full ${p.badge === 'Sale' ? 'bg-secondary' : 'bg-accent'}`}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-secondary font-medium">{p.category}</span>
                      <h4 className="font-semibold text-dark mt-1 mb-1 text-sm leading-snug">{p.name}</h4>
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

              {/* PAGINATION */}
              <div className="flex justify-center gap-2 mt-10">
                {[1,2,3].map((n) => (
                  <button key={n} className={`w-9 h-9 rounded-lg font-semibold text-sm transition ${n === 1 ? 'bg-primary text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-secondary hover:text-secondary'}`}>
                    {n}
                  </button>
                ))}
                <button className="w-9 h-9 rounded-lg bg-white border border-gray-300 text-gray-600 hover:border-secondary hover:text-secondary font-semibold text-sm transition">
                  <i className="bi bi-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
