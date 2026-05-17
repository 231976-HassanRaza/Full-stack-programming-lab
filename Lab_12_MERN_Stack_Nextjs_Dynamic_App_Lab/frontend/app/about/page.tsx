import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, Truck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 opacity-25">
          <Image src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400" alt="About" fill className="object-cover" unoptimized />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Rustik Plank</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">We craft beautiful furniture from reclaimed wood, preserving stories and creating heirlooms for generations to come.</p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide mb-2">Our Story</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Handcrafted with Love & Sustainability</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Founded in 2010, Rustik Plank began as a small workshop in the heart of Pakistan. Our passion for sustainable woodworking led us to specialize in reclaimed wood furniture — pieces that not only look beautiful but also carry a rich history.</p>
          <p className="text-gray-600 leading-relaxed mb-6">Every piece of wood we use has lived a previous life. We source from old barns, demolished buildings, and sustainable forests. Our craftsmen then transform these materials into stunning furniture that will last another century.</p>
          <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-sm font-semibold text-sm transition inline-block">Explore Our Collection</Link>
        </div>
        <div className="relative aspect-square rounded overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600" alt="Workshop" fill className="object-cover" unoptimized />
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why Choose Rustik Plank?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "Sustainable", desc: "All materials are reclaimed or sustainably sourced. We care for the environment with every piece we make." },
              { icon: Award, title: "Quality Crafted", desc: "Each piece is handcrafted by skilled artisans with decades of experience in fine woodworking." },
              { icon: Truck, title: "Fast Delivery", desc: "We deliver across Pakistan and internationally. Free shipping on orders over £50." },
              { icon: Heart, title: "Made with Love", desc: "Every furniture piece is made with passion and attention to detail that mass production simply can't match." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded p-6 text-center hover:shadow-md transition">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-orange-500" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ num: "500+", label: "Products" }, { num: "10K+", label: "Happy Customers" }, { num: "14", label: "Years Experience" }, { num: "25+", label: "Expert Craftsmen" }].map(({ num, label }) => (
            <div key={label}><p className="text-4xl font-black mb-1">{num}</p><p className="text-orange-100 text-sm">{label}</p></div>
          ))}
        </div>
      </section>

      {/* Policies */}
      <section className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
        {[
          { title: "Return Policy", content: "We offer a 30-day hassle-free return policy. If you're not satisfied with your purchase for any reason, simply contact our team and we'll arrange a return and full refund." },
          { title: "Delivery Information", content: "We ship across Pakistan and internationally. Standard delivery takes 3-5 business days. Express delivery is available. Free shipping on all orders over £50." },
          { title: "Terms & Conditions", content: "By purchasing from Rustik Plank, you agree to our terms of service. All prices are in GBP. We reserve the right to update prices and policies. Contact us for any queries." },
        ].map(({ title, content }) => (
          <div key={title} className="border border-gray-100 rounded p-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
