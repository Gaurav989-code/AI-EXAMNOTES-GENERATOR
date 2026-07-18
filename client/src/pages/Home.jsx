import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import img from "../assets/img1.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen overflow-hidden bg-white text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Column: Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ rotateX: 8, rotateY: -8 }}
            className="transform-gpu origin-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
              className="text-5xl lg:text-6xl font-extrabold bg-linear-to-br from-black/90 via-black/60 to-black/90 
        leading-tight bg-clip-text text-transparent"
            >
              Create Smart <br /> AI Notes in <br /> Seconds
            </motion.h1>

            <motion.p
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
              className="text-xl mt-6 max-w-xl bg-linear-to-br from-gray-700 via-gray-500/70 to-gray-700
        bg-clip-text text-transparent"
            >
              Generate exam-focused Notes, project documentation, flow diagrams
              and revision-ready content using AI - faster, cleaner, and
              smarter.
            </motion.p>

            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              className="mt-10 px-10 py-3 rounded-xl flex items-center gap-3 font-semibold text-lg text-white
        bg-linear-to-r from-black/90 via-black/80 to-black/90 border
        border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Image Presentation */}
        <div style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ rotateX: 8, rotateY: -8, y: -12, scale: 1.05 }}
            className="transform-gpu relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="overflow-hidden ">
              <img
                className="w-full h-auto object-cover block relative"
                src={img}
                alt="AI Notes Preview"
                style={{ transform: "translateZ(35px)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* bottom */}
      <section className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto py-32 px-8 gap-10">
        <Feature
          icon="🎓"
          title="Exam Notes"
          des="Condense dense textbooks into concise, high-yield study guides and active recall questions."
        />
        <Feature
          icon="💼"
          title="Project Notes"
          des="Structure messy brainstorms into functional roadmaps, task lists, and technical documentation."
        />
        <Feature
          icon="📊"
          title="Diagrams"
          des="Instantly turn raw conceptual text into interactive flowcharts and architectural mind maps."
        />
        <Feature
          icon="📥"
          title="PDF Downloads"
          des="Export your generated materials into beautifully formatted, print-ready documents in one click."
        />
      </section>

      <Footer />
    </div>
  );
};

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative rounded-2xl p-6
       bg-linear-to-br from-black/90 via-black/80 to-black/90
       backdrop-blur-2xl
       border border-white/10
       shadow-[0_30px_80px_rgba(0,0,0,0.7)]
       text-white"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* <div
        className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10  
      to-transparent blur-[60px] opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
      /> */}
      <div className="relative z-10 " style={{ transform: "translateZ(30px)" }}>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{des}</p>
      </div>
    </motion.div>
  );
}

export default Home;
