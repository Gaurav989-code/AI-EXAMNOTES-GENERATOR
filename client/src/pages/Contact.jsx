import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaPaperPlane,
  FaEnvelope,
  FaDiscord,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    // Simulate real backend processing delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Auto reset success message after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("error");
    }
  };

  const contactDetails = [
    {
      icon: <FaEnvelope className="text-cyan-400" size={18} />,
      title: "Email Us",
      value: "support@examnotes-ai.com",
      sub: "Response within 24 hours",
    },
    {
      icon: <FaDiscord className="text-indigo-400" size={18} />,
      title: "Community",
      value: "discord.gg/examnotes-ai",
      sub: "Join our active developer group",
    },
    {
      icon: <FaMapMarkerAlt className="text-emerald-400" size={18} />,
      title: "Headquarters",
      value: "San Francisco, CA",
      sub: "Distributed globally",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Radial Lighting Accents */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-full max-w-4xl bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.05),transparent_60%)]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-full max-w-4xl bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.03),transparent_60%)]" />

      <div className="max-w-6xl mx-auto">
        {/* Header Heading */}
        <section className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Have questions about credits, bulk institutional licensing, or
            custom LLM deployments? Drop us a line and our builders will get
            right back to you.
          </p>
        </section>

        {/* Core Layout Split Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Info Modules */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-xl font-bold tracking-tight text-white mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl"
                >
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 shadow-inner">
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {detail.title}
                    </h4>
                    <p className="text-sm text-gray-300 font-medium mt-1 select-all">
                      {detail.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{detail.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interaction Form Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-white/[0.01] border border-white/5 shadow-2xl backdrop-blur-3xl relative"
          >
            {/* Form Success Overlayer State Animation */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 bg-black/80 rounded-3xl z-10 flex flex-col items-center justify-center space-y-4 px-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <FaCheckCircle className="text-emerald-400" size={54} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Thank you for reaching out. A platform support specialist
                    will contact you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-gray-400 tracking-wide uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-400 tracking-wide uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-gray-400 tracking-wide uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  placeholder="Tell us what you're working on..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all resize-none disabled:opacity-50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={
                  status === "loading" ||
                  !formData.name ||
                  !formData.email ||
                  !formData.message
                }
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-black bg-white hover:bg-gray-200 disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg shadow-white/5 active:scale-0.98"
              >
                {status === "loading" ? (
                  <>
                    <FaSpinner
                      className="animate-spin text-gray-600"
                      size={16}
                    />
                    <span>Processing Message...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
