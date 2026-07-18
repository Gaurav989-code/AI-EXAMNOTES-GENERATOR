import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom"; // Added for routing integration
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "History", path: "/history", isInternal: true },
        { label: "Notes", path: "/notes", isInternal: true },
        { label: "Add-Credits", path: "/pricing", isInternal: true },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/aboutUs", isInternal: true },
        { label: "Blog", path: "/blog", isInternal: true },
        { label: "Contact Us", path: "/contact", isInternal: true },
      ],
    },
    {
      title: "Support & Accounts",
      links: [
        { label: "Documentation", path: "#", isInternal: false },
        { label: "Help Center", path: "#", isInternal: false },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", path: "#", isInternal: false },
        { label: "Privacy Policy", path: "#", isInternal: false },
      ],
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mt-20 border-t border-white/5 bg-black text-gray-400"
    >
      {/* Top Border Glow Accent */}
      <div className="absolute top-0 left-1/2 -z-10 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-12 border-b border-white/5">
          {/* Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="logo" className="h-8 w-8" />
              <span className="text-lg font-semibold text-white tracking-tight">
                ExamNotes-<span className="text-gray-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Supercharging student workflows by instantly morphing chaotic
              brainstorms, files, and lectures into structured academic
              material.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: <FaTwitter size={18} />, href: "#" },
                { icon: <FaGithub size={18} />, href: "#" },
                { icon: <FaDiscord size={18} />, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Clean Links Grid Structure */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.isInternal ? (
                      /* React Router Link handles instantaneous inner route swapping without full browser reloads */
                      <Link
                        to={link.path}
                        className="text-sm hover:text-white transition-colors cursor-pointer block"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      /* Fallback Standard Anchor tags for static page sections and external targets */
                      <a
                        href={link.path}
                        className="text-sm hover:text-white transition-colors cursor-pointer block"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs text-gray-600">
          <p>© {currentYear} ExamNotes-AI. All rights reserved.</p>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-gray-400 font-medium">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
