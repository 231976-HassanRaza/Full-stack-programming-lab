"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlog } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog(slug).then((r) => setBlog(r.data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><div className="animate-pulse text-gray-400">Loading...</div></div>;
  if (!blog) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/blog" className="flex items-center gap-1 text-orange-500 hover:underline text-sm mb-6"><ArrowLeft size={14} />Back to Blog</Link>

      <article>
        {blog.image && (
          <div className="relative aspect-video rounded overflow-hidden mb-8">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" unoptimized />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Calendar size={14} />{new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          {blog.author && <span className="flex items-center gap-1"><User size={14} />{blog.author.name}</span>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 text-xs bg-orange-50 text-orange-500 px-3 py-1 rounded-full border border-orange-100">
                <Tag size={10} />{tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-base">{blog.content}</div>
      </article>
    </div>
  );
}
