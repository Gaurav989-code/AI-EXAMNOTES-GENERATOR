import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  IoArrowBackOutline,
  IoDiamondOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState(199); // Defaults to popular card amount
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handelPaying = async (amount) => {
    setPayingAmount(amount);
    setPaying(true);

    try {
      const orderRes = await axios.post(
        `${serverUrl}/api/credits/order`,
        { amount },
        { withCredentials: true },
      );

      if (orderRes.data?.url) {
        window.location.href = orderRes.data.url;
      } else {
        alert("Payment session generated, but checkout URL is missing.");
        setPaying(false);
      }
    } catch (error) {
      console.error("Error launching Stripe checkout session pipeline:", error);
      alert(
        error.response?.data?.message ||
          "Internal payment framework sync dropped.",
      );
      setPaying(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-sans px-4 md:px-8 py-10 selection:bg-cyan-500/30">
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-md"
        >
          <IoArrowBackOutline size={16} /> Back
        </button>

        <span className="font-black tracking-tight text-xl bg-linear-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent">
          .ExamNotes AI
        </span>
      </div>

      {/* Main Pitch Banner Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Fuel Your Prep with Credits
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Choose a plan that fits your study needs. Unlock instant exam answers,
          advanced flow diagram models, and high-speed core lecture logs.
        </p>
      </motion.div>

      {/* Pricing Options Responsive Grid System */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        <PricingCard
          title="Starter Pack"
          price="₹99"
          amount={99}
          credits="100 Credits"
          description="Perfect for quick revisions and individual assignment helpers."
          features={[
            "Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Fast generation",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handelPaying}
          paying={paying}
          payingAmount={payingAmount}
        />
        <PricingCard
          popular
          title="Scholar Choice"
          price="₹199"
          amount={199}
          credits="240 Credits"
          description="Best for midterms, finals, and intensive core syllabus logging workflows."
          features={[
            "Everything in Starter Pack",
            "Prioritized generation speeds",
            "Enhanced detailed explanations",
            "Extended multi-page diagram prints",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handelPaying}
          paying={paying}
          payingAmount={payingAmount}
        />
        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="750 Credits"
          description="Unlimited stamina built out for persistent semester coverage and revision sync logs."
          features={[
            "Everything in Scholar Choice",
            "Dedicated high-throughput pipeline",
            "Early access to beta mock test generators",
            "Lifetime stored log revision backups",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handelPaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
};

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => setSelectedPrice(amount)}
      className={`relative p-6 md:p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-md border cursor-pointer transition-all flex flex-col justify-between select-none
        ${
          isSelected
            ? "border-cyan-400 shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] bg-zinc-900/80"
            : popular
              ? "border-purple-500/50 shadow-[0_15px_30px_-15px_rgba(168,85,247,0.1)]"
              : "border-zinc-800/80 hover:border-zinc-700"
        }`}
    >
      {/* Absolute Badges Layout Container */}
      <div className="absolute top-4 right-4 flex gap-2">
        {popular && (
          <span className="text-[10px] font-black uppercase tracking-widest bg-linear-to-r from-purple-500 to-indigo-500 px-2.5 py-1 rounded-md text-white shadow-sm">
            Popular
          </span>
        )}
        {isSelected && (
          <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-400 px-2.5 py-1 rounded-md text-zinc-950 shadow-sm">
            Active
          </span>
        )}
      </div>

      <div>
        <h3 className="font-extrabold text-xl text-gray-100 mb-2">{title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed min-h-[36px]">
          {description}
        </p>

        {/* Pricing Layout Box Wrapper */}
        <div className="my-6 py-4 border-y border-zinc-800/60 flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-black text-white">
            {price}
          </span>
          <span className="text-gray-500 text-xs font-medium">/ flat rate</span>
        </div>

        {/* Credits Counter Pack Display Header Tag */}
        <div className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-800 px-3 py-2 rounded-xl w-fit mb-6">
          <IoDiamondOutline
            className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]"
            size={16}
          />
          <span className="font-mono text-cyan-400 font-bold text-xs tracking-wide">
            {credits}
          </span>
        </div>

        {/* Core Perks Content Iterators List layout */}
        <ul className="space-y-3 mb-8">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs text-gray-300 font-medium leading-tight"
            >
              <IoCheckmarkCircle
                className="text-emerald-400 shrink-0 mt-0.5"
                size={15}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic CTAs Submit Trigger Buttons Layout Area */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        disabled={paying}
        className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md select-none
          ${
            isPayingThisCard
              ? "bg-zinc-800 text-cyan-400 cursor-not-allowed animate-pulse border border-zinc-700"
              : paying
                ? "bg-zinc-800 text-gray-500 cursor-not-allowed border border-zinc-900"
                : isSelected
                  ? "bg-cyan-400 text-zinc-950 hover:bg-cyan-300 hover:scale-[1.01]"
                  : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60"
          }`}
      >
        {isPayingThisCard
          ? "Redirecting to Stripe..."
          : paying
            ? "Processing..."
            : "Buy Credits Now"}
      </button>
    </motion.div>
  );
}

export default Pricing;
