"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories, getBlogs } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getProducts({ featured: true, limit: 8 }).then((r) => setFeatured(r.data.products));
    getCategories().then((r) => setCategories(r.data));
    getBlogs().then((r) => setBlogs(r.data.slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400" alt="Hero" fill className="object-cover" unoptimized />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-xl">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">Reclaimed & Handcrafted</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Beautiful Furniture<br/>
              <span className="text-orange-400">Hand Crafted</span> from<br/>
              Reclaimed Wood
            </h1>
            <p className="text-gray-300 mb-8 text-lg">Every piece tells a story. Sustainable, unique, and built to last generations.</p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold rounded-sm transition">Shop Now</Link>
              <Link href="/about" className="border border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 font-semibold rounded-sm transition">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-orange-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon:Truck,text:"Free Shipping Over £50"},{icon:ShieldCheck,text:"2-Year Warranty"},{icon:RotateCcw,text:"30-Day Returns"},{icon:Headphones,text:"24/7 Support"}].map(({icon:Icon,text})=>(
            <div key={text} className="flex items-center gap-2 justify-center text-sm font-medium"><Icon size={20}/><span>{text}</span></div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Collection</h2>
          <Link href="/products" className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm font-medium">View All <ArrowRight size={16}/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat)=>(
            <Link key={cat._id} href={`/products?category=${cat.slug}`}>
              <div className="group relative aspect-square rounded overflow-hidden bg-gray-100">
                <Image src={cat.image||"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300"} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-bold text-sm uppercase tracking-wide">{cat.name}</p>
                  <p className="text-xs text-orange-300">Collection</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="bg-amber-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Hot Deals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600" alt="Sale" width={600} height={300} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
                <div className="text-white">
                  <p className="text-orange-400 font-bold text-xl">Sale Off</p>
                  <p className="text-5xl font-black">50%</p>
                  <p className="text-lg">Reclaimed and hand crafted</p>
                  <Link href="/products?isSpecial=true" className="mt-3 inline-block bg-orange-500 text-white px-6 py-2 text-sm font-semibold rounded-sm hover:bg-orange-600 transition">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="relative rounded overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600" alt="Sale" width={600} height={300} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
                <div className="text-white">
                  <p className="text-orange-400 font-bold text-xl">Elite Collection</p>
                  <p className="text-3xl font-black">Design Furniture</p>
                  <p className="text-4xl font-black text-orange-400">35% Off</p>
                  <Link href="/products?featured=true" className="mt-3 inline-block bg-white text-gray-900 px-6 py-2 text-sm font-semibold rounded-sm hover:bg-orange-500 hover:text-white transition">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Online Banner */}
      <section className="bg-orange-500 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div><p className="text-2xl font-black">BUY ONLINE</p><p className="text-sm opacity-80">Now available in our store system</p></div>
          <div className="text-right"><p className="text-lg font-semibold">Pick up in store</p><p className="text-sm opacity-80">Available on select products</p></div>
          <Link href="/products" className="bg-white text-orange-500 px-8 py-2 font-bold rounded-sm hover:bg-gray-100 transition text-sm">LEARN MORE</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <div className="flex gap-2">
            <Link href="/products?featured=true" className="text-xs border border-gray-300 px-3 py-1.5 hover:border-orange-500 hover:text-orange-500 transition">See All Featured</Link>
            <Link href="/products?isSpecial=true" className="text-xs border border-gray-300 px-3 py-1.5 hover:border-orange-500 hover:text-orange-500 transition">See All Special</Link>
            <Link href="/products?isPopular=true" className="text-xs border border-gray-300 px-3 py-1.5 hover:border-orange-500 hover:text-orange-500 transition">See All Popular</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p)=><ProductCard key={p._id} product={p}/>)}
        </div>
      </section>

      {/* Blog */}
      {blogs.length>0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
              <Link href="/blog" className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm font-medium">View All <ArrowRight size={16}/></Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((blog)=>(
                <Link key={blog._id} href={`/blog/${blog.slug}`}>
                  <div className="bg-white rounded overflow-hidden hover:shadow-md transition group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={blog.image||"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized/>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{blog.excerpt}</p>
                      <span className="inline-block mt-3 text-xs text-orange-500 font-medium">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brands */}
      <section className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Trusted by leading brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            {["QANTAS","LexisNexis","Rockwell Collins","GE Money","INTERRISK","F4P"].map((b)=>(
              <span key={b} className="text-gray-600 font-bold text-sm">{b}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
