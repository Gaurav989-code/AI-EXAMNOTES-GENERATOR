import React, { useState } from "react";
import { motion } from "motion/react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoDiamondOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaNoteSticky } from "react-icons/fa6";
import TopicForms from "../components/TopicForms";

const Notes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const credits = userData.user.credits;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className=" mb-10 px-8 py-6 rounded-2xl bg-black/80 backdrop-blur-xl  
        shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 flex items-start md:items-center justify-between gap-4 flex-col md:flex-row "
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1
            className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text 
        text-transparent"
          >
            ExamNotes AI
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            AI-Powered exam oriented Notes & Revision
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="px-4 py-2 flex items-center gap-2  rounded-xl text-sm font-semibold bg-white/10 text-white border border-white/20
           cursor-pointer shadow-md"
          >
            <motion.span
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaNoteSticky size={20} className="text-cyan-500" />
            </motion.span>
            <span>Your Notes</span>
          </button>

          <button
            onClick={() => navigate("/pricing")}
            className="px-4 py-2 flex items-center gap-2  rounded-xl text-sm font-semibold bg-white/10 text-white border border-white/20
           cursor-pointer shadow-md"
          >
            <motion.span
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoDiamondOutline size={20} className="text-cyan-500" />
            </motion.span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus size={20} className="text-white" />
            </motion.span>
          </button>
        </div>
      </motion.header>

      <motion.div className="mb-10">
        <TopicForms
          loading={loading}
          setLoading={setLoading}
          setResult={setResult}
          setError={setError}
        />
      </motion.div>
    </div>
  );
};

export default Notes;
