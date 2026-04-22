import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">About Us</h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Learn about our team, our mission, and why we built NextShop.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-10 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Our Mission</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We aim to deliver high-quality tech products at affordable prices, while showcasing
            the power of modern web development using Next.js and Tailwind CSS.
          </p>
        </div>

        {/* Team Section */}
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">👥 Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Hassan", role: "Full Stack Developer", avatar: "👨‍💻", desc: "BSSE student passionate about AI & web apps." },
            { name: "Musab Ejaz", role: "Frontend Developer", avatar: "🧑‍🎨", desc: "Loves crafting clean UI with React & Tailwind." },
            { name: "Tayyab Ahmed", role: "Backend Developer", avatar: "🧑‍🔧", desc: "FastAPI & database specialist on the team." },
          ].map((member) => (
            <div key={member.name} className="bg-white border border-orange-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-3">{member.avatar}</div>
              <h3 className="text-lg font-bold text-blue-800">{member.name}</h3>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mt-1 mb-2">
                {member.role}
              </span>
              <p className="text-gray-500 text-sm">{member.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-white border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-4">🛠️ Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js 15", "TypeScript", "Tailwind CSS", "React 19", "Node.js"].map((tech) => (
              <span key={tech} className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow">
            Contact Us →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
