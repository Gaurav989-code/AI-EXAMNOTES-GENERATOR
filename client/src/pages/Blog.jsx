import React, { useState } from "react";
import { motion } from "motion/react";
import { FaRegClock, FaChevronRight, FaSearch } from "react-icons/fa";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "AI Models",
    "Study Tips",
    "Productivity",
    "Updates",
  ];

  const blogPosts = [
    {
      id: 1,
      title:
        "How to Turn 50-Page PDF Textbooks into Active Recall Flashcards Instantly",
      excerpt:
        "Deep dive into our latest layout ingestion pipelines that clean raw mathematical equations and convert standard paragraph blocks into crisp study flashcards.",
      category: "Study Tips",
      date: "July 12, 2026",
      readTime: "5 min read",
      author: "Alex Rivera",
      avatar: "https://unsplash.com",
      image: "https://unsplash.com",
      featured: true,
    },
    {
      id: 2,
      title: "Introducing LLama-3.3 Custom Fine-Tuning for Technical Diagrams",
      excerpt:
        "We updated our backend node structures to support lightning-fast architectural logic rendering pipelines.",
      category: "AI Models",
      date: "July 08, 2026",
      readTime: "4 min read",
      author: "Marcus Vance",
      avatar: "https://unsplash.com",
      image: "https://unsplash.com",
      featured: false,
    },
    {
      id: 3,
      title: "5 Time-Management Rules Every Computer Science Student Needs",
      excerpt:
        "Overcome structural burnout and balance heavy code-heavy engineering tracks with smart automated note systems.",
      category: "Productivity",
      date: "June 28, 2026",
      readTime: "7 min read",
      author: "Sarah Chen",
      avatar: "https://unsplash.com",
      image: "https://unsplash.com",
      featured: false,
    },
    {
      id: 4,
      title:
        "Summer Release Notes: Dark Mode Overhauls & Offline Markdown Syncing",
      excerpt:
        "Check out our complete design system refactoring log containing pristine state optimizations and clean layout fixes.",
      category: "Updates",
      date: "June 15, 2026",
      readTime: "3 min read",
      author: "Alex Rivera",
      avatar: "https://unsplash.com",
      image: "https://unsplash.com",
      featured: false,
    },
  ];

  // Filtering Logic
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || activeCategory !== "All",
  );

  return (
    <main className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white px-6 pt-32 pb-20">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.06),transparent_60%)]" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Content */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
          >
            The ExamNotes-AI Blog
          </motion.h1>
          <p className="text-gray-400 text-sm md:text-base">
            Insights, tutorials, and deep engineering breakdowns on mastering
            your study flows with modern machine-learning models.
          </p>
        </section>

        {/* Category Pill Filters Bar */}
        <section className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none
                ${
                  activeCategory === cat
                    ? "bg-white text-black border-white shadow-md shadow-white/5"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Dynamic Layout Rendering Section */}
        {activeCategory === "All" && featuredPost && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-3xl"
          >
            <div className="overflow-hidden rounded-2xl border border-white/5 aspect-video lg:aspect-auto lg:h-full">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
            </div>
            <div className="flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Featured Article
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight group-hover:text-purple-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.avatar}
                    alt={featuredPost.author}
                    className="w-8 h-8 rounded-full border border-white/10"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {featuredPost.author}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {featuredPost.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-1 rounded-lg">
                  <FaRegClock size={12} className="text-purple-400" />{" "}
                  {featuredPost.readTime}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Regular Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 shadow-xl hover:border-white/10 transition-all backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/5 aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 filter brightness-95"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight mt-3 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-6 h-6 rounded-full border border-white/10"
                  />
                  <span className="text-[11px] font-medium text-gray-300">
                    {post.author}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">
                  {post.date}
                </span>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Blog;
