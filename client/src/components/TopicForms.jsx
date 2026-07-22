import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiBookOpen,
  FiLayers,
  FiCpu,
  FiCheck,
  FiFileText,
} from "react-icons/fi";
import { generateNotes } from "../services/api";

const TopicForms = ({ setResult, loading, setLoading, setError, result }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagrams] = useState(false);
  const [includeChart, setIncludeCharts] = useState(false);

  const handelGeneratedResponse = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      if (response && response.success) {
        const notesContent =
          response.data?.content?.notes ||
          response.data?.content ||
          response.data;
        setResult(notesContent);
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      setError("Failed to fetch notes from server");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handelGeneratedResponse();
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white p-8 space-y-6 rounded-2xl bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/5"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input Row */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Topic Subject
            </label>
            <div className="relative flex items-center">
              <FiBookOpen className="absolute left-4 text-cyan-500" size={16} />
              <input
                type="text"
                value={topic}
                disabled={loading}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter Topic (e.g. web development)"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Class Level
              </label>
              <div className="relative flex items-center">
                <FiLayers className="absolute left-4 text-cyan-500" size={16} />
                <input
                  type="text"
                  value={classLevel}
                  disabled={loading}
                  onChange={(e) => setClassLevel(e.target.value)}
                  placeholder="e.g. Undergraduate, 11th Grade"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Exam Type
              </label>
              <div className="relative flex items-center">
                <FiLayers className="absolute left-4 text-cyan-500" size={16} />
                <input
                  type="text"
                  value={examType}
                  disabled={loading}
                  onChange={(e) => setExamType(e.target.value)}
                  placeholder="e.g. Midterm, UPSC, SATs"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Configuration
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "rev",
                  label: "Revision Mode",
                  state: revisionMode,
                  setter: setRevisionMode,
                },
                {
                  id: "diag",
                  label: "Include Diagrams",
                  state: includeDiagram,
                  setter: setIncludeDiagrams,
                },
                {
                  id: "char",
                  label: "Include Charts",
                  state: includeChart,
                  setter: setIncludeCharts,
                },
              ].map((toggle) => (
                <button
                  type="button"
                  key={toggle.id}
                  disabled={loading}
                  onClick={() => toggle.setter(!toggle.state)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between select-none disabled:opacity-40 disabled:cursor-not-allowed
                  ${
                    toggle.state
                      ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300 cursor-pointer"
                      : "bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 cursor-pointer"
                  }`}
                >
                  <span>{toggle.label}</span>
                  {toggle.state && <FiCheck className="text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={!topic || loading}
            whileTap={!topic || loading ? {} : { scale: 0.98 }}
            className={`w-full mt-4 py-3.5 px-6 rounded-xl font-semibold text-sm flex 
                    items-center justify-center gap-2 text-black bg-white hover:bg-indigo-400/50 hover:text-indigo-200 transition-all 
                    shadow-xl shadow-black/20 ${loading ? "bg-white/50 cursor-wait" : "cursor-pointer"}`}
          >
            <FiCpu
              size={22}
              className={`text-cyan-500 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Generating..." : "Generate AI Framework"}</span>
          </motion.button>
        </form>
      </motion.div>

      <div className="border-t border-white/5 pt-6 mt-8">
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
              className="p-6 rounded-xl bg-white/[0.02] border border-cyan-500/10 shadow-inner select-text selection:bg-cyan-500/20"
            >
              <div className="prose prose-invert max-w-none text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {typeof result === "object"
                  ? JSON.stringify(result, null, 2)
                  : result}
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

export default TopicForms;
