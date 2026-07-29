import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoDiamondOutline } from "react-icons/io5";
import { FiPlus, FiFileText } from "react-icons/fi";
import { FaNoteSticky } from "react-icons/fa6";
import TopicForms from "../components/TopicForms";
import SidebarNotes from "../components/SidebarNotes";
import FinalResult from "../components/FinalResult";

const Notes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const credits = userData?.user?.credits ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8 text-gray-800 overflow-x-hidden relative">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" mb-10 px-8 py-6 rounded-2xl bg-black/80 backdrop-blur-xl  
        shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 flex items-start md:items-center justify-between gap-4 flex-col md:flex-row "
      >
        <div onClick={() => navigate("/")} className="cursor-pointer group">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-tight">
            ExamNotes AI
          </h1>
          <p className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-300 transition-colors">
            AI-Powered exam oriented Notes & Revision Workspace
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
          <button
            onClick={() => navigate("/history")}
            className="px-4 py-2.5 flex items-center gap-2 rounded-xl text-xs font-semibold bg-white/5 text-white border border-white/10
           hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-md select-none"
          >
            <FaNoteSticky size={16} className="text-cyan-400" />
            <span>Your Notes</span>
          </button>

          <button
            onClick={() => navigate("/pricing")}
            className="px-4 py-2.5 flex items-center gap-2 rounded-xl text-xs font-semibold bg-white/5 text-white border border-white/10
           hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-md select-none"
          >
            <IoDiamondOutline
              size={16}
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
            />
            <span className="font-mono">{credits}</span>
            <FiPlus size={14} className="text-gray-400 ml-0.5" />
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <TopicForms
          loading={loading}
          setLoading={setLoading}
          setResult={setResult}
          setError={setError}
          result={result}
        />
      </motion.div>

      <div className="border-t max-w-full border-white/5 mx-auto pt-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-xs flex items-center gap-3 shadow-lg select-none"
          >
            <svg
              className="w-4 h-4 text-red-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 p-6 rounded-xl bg-white/[0.01] border border-white/5 animate-pulse"
            >
              <div className="h-4 bg-white/10 rounded-md w-1/3" />
              <div className="h-3 bg-white/5 rounded-md w-full" />
              <div className="h-3 bg-white/5 rounded-md w-5/6" />
            </motion.div>
          ) : result ? (
            <motion.div
              key="result-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-6 rounded-xl bg-white/[0.01] border border-white/5 shadow-2xl select-text selection:bg-cyan-500/20 
        max-w-none flex flex-col lg:grid lg:grid-cols-4 gap-6 items-start"
            >
              <div className="w-full lg:col-span-1 lg:sticky lg:top-24">
                <SidebarNotes result={result} />
              </div>

              <div className="w-full lg:col-span-3 min-h-[400px] flex">
                <FinalResult result={result} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-3 text-xs text-gray-500"
            >
              <FiFileText className="text-gray-600" size={16} />
              <p>
                Your generated frameworks and structured markdown study notes
                will appear here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notes;

// {typeof result === "object"
//                 ? JSON.stringify(result, null, 2)
//                 : result}
