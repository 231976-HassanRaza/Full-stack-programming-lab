"use client";
import { useEffect, useState } from "react";
import { getBlogs } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((r) => setBlogs(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Our Blog</h1>
          <p className="text-gray-400">Stories, tips & inspiration from Rustik Plank</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />)}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No blog posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <article className="bg-white border border-gray-100 rounded overflow-hidden hover:shadow-md transition group h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={blog.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11} />{new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <h2 className="font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition line-clamp-2">{blog.title}</h2>
                    <p className="text-gray-500 text-sm line-clamp-3 flex-1">{blog.excerpt}</p>
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {blog.tags.map((tag: string) => (
                          <span key={tag} className="flex items-center gap-0.5 text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                            <Tag size={9} />{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-block mt-4 text-xs font-medium text-orange-500">Read More →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
