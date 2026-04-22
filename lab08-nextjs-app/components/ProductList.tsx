import Link from "next/link";

export const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "Premium noise-cancelling over-ear headphones with 30-hour battery life and crystal-clear sound.",
    price: 4999,
    image: "🎧",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    description: "Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.",
    price: 8499,
    image: "⌚",
    category: "Wearables",
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches, perfect for gaming and typing.",
    price: 3299,
    image: "⌨️",
    category: "Accessories",
  },
  {
    id: 4,
    title: "Portable Speaker",
    description: "Waterproof Bluetooth speaker with 360° sound, 20-hour battery, and compact design.",
    price: 2199,
    image: "🔊",
    category: "Electronics",
  },
  {
    id: 5,
    title: "USB-C Hub 7-in-1",
    description: "Expand your laptop ports with HDMI, USB 3.0, SD card, and fast charging support.",
    price: 1599,
    image: "🔌",
    category: "Accessories",
  },
];

export default function ProductList() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        🛒 Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
          >
            {/* Icon */}
            <div className="text-5xl text-center mb-3">{product.image}</div>

            {/* Category badge */}
            <span className="self-start bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full mb-2">
              {product.category}
            </span>

            {/* Title */}
            <h3 className="text-lg font-bold text-blue-800 mb-1">{product.title}</h3>

            {/* Description */}
            <p className="text-gray-500 text-sm flex-grow mb-4">{product.description}</p>

            {/* Price + Link */}
            <div className="flex items-center justify-between mt-auto">
              <span className="text-blue-600 font-bold text-lg">Rs. {product.price.toLocaleString()}</span>
              <Link
                href={`/products/${product.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
