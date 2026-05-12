import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = { title: 'Serenity 6-Person Hot Tub – AquaLux' };

const specs = [
  { label: 'Capacity', value: '6 Adults' },
  { label: 'Jets', value: '42 Hydrotherapy Jets' },
  { label: 'Dimensions', value: '84" x 84" x 36"' },
  { label: 'Water Capacity', value: '400 Gallons' },
  { label: 'Weight (Empty)', value: '780 lbs' },
  { label: 'Warranty', value: '5 Years Full Coverage' },
];

const related = [
  { name: 'Cascade Swim Spa 14ft', price: '$8,999', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop' },
  { name: 'Premium Spa Cover', price: '$349', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=400&fit=crop' },
  { name: 'Chemical Kit', price: '$89', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=400&fit=crop' },
];

export default function Product() {
  return (
    <>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="bg-lightbg border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-accent transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-accent transition">Shop</Link>
          <span>/</span>
          <span className="text-dark">Serenity 6-Person Hot Tub</span>
        </div>
      </div>

      {/* PRODUCT DETAIL */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-lightbg h-96 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=600&fit=crop"
                  alt="Serenity Hot Tub"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden h-20 bg-lightbg ring-2 ring-accent cursor-pointer">
                    <img
                      src={`https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=160&fit=crop&sat=${i*20}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">New</span>
              <h1 className="text-3xl font-extrabold text-dark mt-3 mb-2">Serenity 6-Person Hot Tub</h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-gray-400 text-sm">(42 reviews)</span>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-bold text-primary">$4,299</span>
                <span className="text-xl text-gray-400 line-through">$5,199</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Save $900</span>
              </div>

              <p className="text-gray-500 leading-relaxed mb-6">
                The Serenity 6-Person Hot Tub delivers the ultimate hydrotherapy experience with 42 precision-positioned jets, LED mood lighting, and an advanced water management system. Perfect for families and entertainers alike.
              </p>

              {/* Options */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-dark mb-2 block">Color</label>
                <div className="flex gap-3">
                  {['Midnight Blue', 'Arctic White', 'Graphite'].map((c) => (
                    <button key={c} className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-xs font-medium hover:border-primary transition">
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-dark mb-2 block">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-32">
                  <button className="px-3 py-2 text-gray-500 hover:text-primary font-bold">−</button>
                  <span className="flex-1 text-center text-sm font-semibold">1</span>
                  <button className="px-3 py-2 text-gray-500 hover:text-primary font-bold">+</button>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Link href="/cart" className="flex-1 bg-accent text-white py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 hover:bg-orange-400 transition">
                  <i className="bi bi-cart-plus" /> Add to Cart
                </Link>
                <Link href="/checkout" className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 hover:bg-opacity-90 transition">
                  Buy Now
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
                {[
                  { icon: 'bi-truck', text: 'Free White-Glove Delivery' },
                  { icon: 'bi-shield-check', text: '5-Year Warranty' },
                  { icon: 'bi-arrow-return-left', text: '30-Day Returns' },
                  { icon: 'bi-headset', text: '24/7 Support' },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2">
                    <i className={`bi ${f.icon} text-secondary`} />
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS TABS */}
      <section className="py-10 bg-lightbg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            {['Specifications', 'Description', 'Reviews (42)'].map((tab, i) => (
              <button key={tab} className={`pb-3 text-sm font-semibold border-b-2 transition ${i === 0 ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-primary'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            {specs.map((s) => (
              <div key={s.label} className="flex justify-between bg-white rounded-lg px-5 py-3 shadow-sm">
                <span className="text-gray-500 text-sm">{s.label}</span>
                <span className="font-semibold text-dark text-sm">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <div key={p.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h5 className="font-semibold text-sm text-dark">{p.name}</h5>
                    <span className="text-primary font-bold">{p.price}</span>
                  </div>
                  <Link href="/product" className="bg-secondary text-white text-xs px-3 py-2 rounded-lg hover:bg-opacity-90 transition">View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
