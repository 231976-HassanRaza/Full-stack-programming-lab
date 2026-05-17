"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, addReview } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, Star, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    getProductBySlug(slug).then((r) => setProduct(r.data)).catch(() => {});
  }, [slug]);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-lg">Loading product...</div>
    </div>
  );

  const handleAddToCart = () => {
    if (product.stock === 0) return toast.error("Out of stock");
    addToCart({ _id: product._id, name: product.name, price: product.salePrice || product.price, image: product.images[0] || "", quantity: qty, stock: product.stock });
    toast.success("Added to cart!");
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to review");
    setSubmitting(true);
    try {
      await addReview(product._id, { rating, comment });
      toast.success("Review submitted!");
      setComment("");
      const r = await getProductBySlug(slug);
      setProduct(r.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const displayPrice = product.salePrice || product.price;
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500">Home</Link> /
        <Link href="/products" className="hover:text-orange-500">Products</Link> /
        {product.category && <><Link href={`/products?category=${product.category.slug}`} className="hover:text-orange-500">{product.category.name}</Link> /</>}
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded overflow-hidden bg-gray-50 mb-3">
            <Image src={product.images[mainImg] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"} alt={product.name} fill className="object-cover" unoptimized />
            {discount > 0 && <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-3 py-1 font-bold rounded-sm">{discount}% Off</span>}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img: string, i: number) => (
              <button key={i} onClick={() => setMainImg(i)} className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition ${mainImg === i ? "border-orange-500" : "border-transparent"}`}>
                <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" unoptimized />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.category && <p className="text-orange-500 text-sm font-medium mb-1">{product.category.name}</p>}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.round(product.rating) ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"} />)}</div>
            <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl font-bold text-gray-900">£{displayPrice.toFixed(2)}</span>
            {product.salePrice && <span className="text-gray-400 text-lg line-through">£{product.price.toFixed(2)}</span>}
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="mb-5">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-sm ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"><Minus size={16}/></button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"><Plus size={16}/></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-sm font-semibold transition">
                <ShoppingCart size={18}/> Add to Cart
              </button>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
            {[{icon:Truck,text:"Free Shipping"},{icon:Shield,text:"2-Year Warranty"},{icon:RotateCcw,text:"30-Day Returns"}].map(({icon:Icon,text})=>(
              <div key={text} className="flex flex-col items-center gap-1 text-center">
                <Icon size={20} className="text-orange-500"/>
                <span className="text-xs text-gray-500">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="border-t border-gray-100 pt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews ({product.numReviews})</h2>
        {product.reviews?.length > 0 && (
          <div className="space-y-4 mb-8">
            {product.reviews.map((r: any, i: number) => (
              <div key={i} className="bg-gray-50 rounded p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{r.name?.[0]}</div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{r.name}</p>
                    <div className="flex">{[...Array(5)].map((_,j)=><Star key={j} size={12} className={j<r.rating?"text-orange-400 fill-orange-400":"text-gray-200 fill-gray-200"}/>)}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
        {user ? (
          <form onSubmit={handleReview} className="bg-white border border-gray-100 rounded p-6 max-w-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex gap-1">{[1,2,3,4,5].map((s)=>(
                <button key={s} type="button" onClick={()=>setRating(s)}>
                  <Star size={24} className={s<=rating?"text-orange-400 fill-orange-400":"text-gray-200 fill-gray-200"}/>
                </button>
              ))}</div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea value={comment} onChange={(e)=>setComment(e.target.value)} rows={4} required className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400" placeholder="Share your experience..."/>
            </div>
            <button type="submit" disabled={submitting} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-6 py-2 rounded-sm font-semibold text-sm transition">
              {submitting?"Submitting...":"Submit Review"}
            </button>
          </form>
        ) : (
          <p className="text-gray-500 text-sm"><Link href="/auth/login" className="text-orange-500 font-medium hover:underline">Login</Link> to write a review.</p>
        )}
      </div>
    </div>
  );
}
