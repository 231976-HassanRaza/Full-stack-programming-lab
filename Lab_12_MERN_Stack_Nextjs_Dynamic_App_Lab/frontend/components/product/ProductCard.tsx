"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  _id: string; name: string; slug: string; price: number; salePrice?: number;
  images: string[]; rating: number; numReviews: number; stock: number;
  category?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock === 0) return toast.error("Out of stock");
    addToCart({ _id: product._id, name: product.name, price: product.salePrice || product.price, image: product.images[0] || "", quantity: 1, stock: product.stock });
    toast.success("Added to cart!");
  };

  return (
    <Link href={`/products/${product.slug || product._id}`}>
      <div className="group bg-white border border-gray-100 rounded-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          {product.salePrice && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 font-semibold rounded-sm">
              Sale {Math.round((1 - product.salePrice / product.price) * 100)}% Off
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-3">
          {product.category && (
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.category.name}</p>
          )}
          <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-orange-500 transition">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className={i < Math.round(product.rating) ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"} />
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.numReviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-orange-500 font-bold text-sm">£{product.salePrice.toFixed(2)}</span>
                  <span className="text-gray-400 text-xs line-through">£{product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-gray-800 font-bold text-sm">£{product.price.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 bg-gray-800 hover:bg-orange-500 text-white text-xs px-2.5 py-1.5 rounded-sm transition"
            >
              <ShoppingCart size={12} /> Detail
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
