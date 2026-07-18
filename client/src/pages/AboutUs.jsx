import React from "react";
import { motion } from "motion/react";
import { FaGraduationCap, FaBrain, FaRegCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  const values = [
    {
      icon: "⚡",
      title: "Speed to Knowledge",
      des: "We believe context shouldn't take hours to parse. Our engine condenses lectures into revision material in seconds.",
    },
    {
      icon: "🔮",
      title: "Clarity over Clutter",
      des: "AI should organize information, not add to the noise. We prioritize clean layouts, automated code blocks, and clear diagrams.",
    },
    {
      icon: "💎",
      title: "Academic Integrity",
      des: "Built to supplement deep understanding. Our systems emphasize accurate formatting, active recall testing, and trustworthy data sourcing.",
    },
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & AI Engineer",
      avatar: "https://unsplash.com",
    },
    {
      name: "Sarah Chen",
      role: "Head of Product Design",
      avatar: "https://unsplash.com",
    },
    {
      name: "Marcus Vance",
      role: "Core Infrastructure",
      avatar: "https://unsplash.com",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-20">
      {/* Decorative Top Radial Glow Accent */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_65%)]" />

      {/* Hero Headline Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-400 tracking-wider uppercase select-none"
        >
          <FaBrain className="text-cyan-400 animate-pulse" /> Our Mission
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-clip-text text-transparent leading-tight"
        >
          Rewriting the Rules <br /> of Academic Workflows
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          ExamNotes-AI was born out of a simple frustration: students and
          professionals waste too much time organizing messy data instead of
          processing it. We build systems that handle the heavy lifting.
        </motion.p>
      </section>

      {/* Core Values Feature Grid */}
      <section className="max-w-6xl mx-auto mt-32">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            What Drives Us
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            The foundation beneath every line of layout and model architecture
            we ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.15)" }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl transition-colors backdrop-blur-3xl flex flex-col"
            >
              <div className="text-3xl mb-4 self-start bg-white/5 p-3 rounded-xl border border-white/10 shadow-inner">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                {value.des}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Corporate Team Row Grid */}
      <section className="max-w-5xl mx-auto mt-32 border-t border-white/5 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Meet the Team
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              The builders crafting your smart markdown outputs daily.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl select-none">
            <FaGraduationCap size={16} className="text-cyan-400" /> Remotely
            distributed worldwide
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="relative p-1 rounded-full border border-white/10 bg-black group-hover:border-cyan-400/40 transition-colors">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
