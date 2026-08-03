import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IoCloseCircle, IoRefreshOutline, IoArrowBackOutline } from "react-icons/io5";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-sans flex items-center justify-center px-4 selection:bg-rose-500/30">
      
      {/* Background Terror Glow Radial Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Error Container Box Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
      >
        {/* Animated Banner Header Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-linear-to-r from-transparent via-rose-500 to-transparent" />

        {/* Error Cross Circle Icon */}
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
          className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
        >
          <IoCloseCircle size={36} />
        </motion.div>

        {/* Content Typography Headlines */}
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-gray-100">
          Transaction Dropped
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          The payment checkout pipeline was canceled or interrupted. Don't worry—no charges were made to your account.
        </p>

        {/* Troubleshooting Guidance Matrix */}
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-2xl p-4 text-left text-xs text-zinc-400 space-y-2.5 mb-8">
          <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-1">
            Common Resolution Steps
          </span>
          <div className="flex gap-2 items-start">
            <span className="text-rose-400/80">•</span>
            <p>Ensure your card permits international transaction routes if processing from outer markets.</p>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-rose-400/80">•</span>
            <p>Verify bank network limits or try matching another funding profile entirely.</p>
          </div>
        </div>

        {/* Navigation Action Buttons Grid Panel */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/pricing")}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-500 text-white hover:bg-rose-400 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md select-none font-sans"
          >
            <IoRefreshOutline size={16} className="group-hover:rotate-45 transition-transform" />
            Retry Plan Selection
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 transition-all cursor-pointer select-none font-sans flex items-center justify-center gap-2"
          >
            <IoArrowBackOutline size={14} />
            Return to Dashboard
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default PaymentFailed;
