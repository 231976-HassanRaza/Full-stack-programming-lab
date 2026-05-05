'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating})</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card flex flex-col group">
      {/* Image */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          <img
            src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} />

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-400">Stock: {product.stock}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="mt-3 w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {product.stock === 0 ? 'Out of Stock' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}
