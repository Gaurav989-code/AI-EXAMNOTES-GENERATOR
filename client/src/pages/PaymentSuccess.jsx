import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  IoCheckmarkCircle,
  IoArrowForwardOutline,
  IoDiamondOutline,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionId = searchParams.get("session_id");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    getCurrentUser(dispatch);

    if (sessionId) {
      console.log("Stripe Verification Session Token Reference ID:", sessionId);
    }

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 2000);

    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-sans flex items-center justify-center px-4 selection:bg-cyan-500/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
          className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
          <IoCheckmarkCircle size={36} />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-gray-100">
          Deposit Confirmed!
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Your payment transaction was safely processed. Study credits are added
          directly to your profile workspace ledger parameters.
        </p>

        {sessionId && (
          <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl px-4 py-3 mb-8 text-left font-mono">
            <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
              Payment Reference ID
            </span>
            <span
              className="block text-xs text-zinc-400 truncate select-all cursor-pointer"
              title="Click to select all"
            >
              {sessionId}
            </span>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-2 bg-zinc-900/80 border border-zinc-800/60 p-4 rounded-2xl w-full mb-8 shadow-inner">
          <div className="flex items-center gap-2">
            <IoDiamondOutline
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-bounce"
              size={20}
            />
            <span className="text-sm font-bold tracking-wide text-cyan-400 uppercase">
              Credits Reloaded Successfully
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-1">
            Auto-redirecting back home in{" "}
            <span className="text-cyan-400 font-bold">{countdown}s</span>...
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-400 text-zinc-950 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md select-none font-sans"
          >
            Go to Study Workspace
            <IoArrowForwardOutline
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
