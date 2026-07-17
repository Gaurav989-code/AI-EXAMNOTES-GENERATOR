import React from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";

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

const Auth = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black px-8">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="max-w-7xl mx-auto mt-8 px-8 py-6 rounded-2xl bg-black/80 backdrop-blur-xl  shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-white/10 "
      >
        <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          ExamNotes AI
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          AI-Powered exam oriented Notes & Revision
        </p>
      </motion.header>

      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-r from-black/90 via-black/50 to-black/90 bg-clip-text text-transparent">
            Unlock Smart <br /> AI Notes
          </h1>

          <motion.button
            whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            className="mt-10 px-10 py-3 rounded-xl flex items-center gap-3 font-semibold text-lg  text-white
            bg-linear-to-r from-black/90 via-black/80 to-black/90 border
             border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            <FcGoogle size={22} className="inline-block mr-2" />
            Continue with Google
          </motion.button>
          <p
            className="mt-6 max-w-xl text-lg
                  bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700
                  bg-clip-text text-transparent"
          >
            You get <span className="font-semibold">50 FREE credits</span> to
            create exam notes, project notes, charts, graphs and download clean
            PDFs - instantly using AI.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            {" "}
            Start with 50 free credits • Upgrade anytime for more credits •
            Instant access
          </p>
        </motion.div>

        {/* Right Content */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          <Feature
            icon="🎁"
            title="100 Free Credits"
            des="Get started with 100 free credits to create exam notes, project notes, charts, graphs and download clean PDFs - instantly using AI."
          />

          <Feature
            icon="📚"
            title="Exam Notes"
            des="Create exam notes for any subject, topic or chapter using AI. Get concise and structured notes for effective learning and revision."
          />

          <Feature
            icon="📂"
            title="Project Notes"
            des="Create comprehensive project notes using AI. Organize your ideas and information for better project management and execution."
          />
          <Feature
            icon="📊📈"
            title="Charts & Graphs"
            des="Visualize your data with AI-generated charts and graphs. Create informative and engaging visual representations for your reports and presentations."
          />
          <Feature
            icon="⬇️"
            title="Free pdf Downloads"
            des="Download your generated notes and documents as clean PDFs - instantly using AI."
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Auth;
