import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  IoCalendarOutline,
  IoChevronForwardCircleOutline,
  IoDiamondOutline,
  IoHomeOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from "../components/FinalResult";

const History = ({ setResult }) => {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.user?.credits ?? 0;

  useEffect(() => {
    const fetchMyNotes = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/notes/getNotes`, {
          withCredentials: true,
        });
        const data = Array.isArray(res.data) ? res.data : res.data?.notes || [];
        setNotesList(data);

        if (data.length > 0) {
          openNote(data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching historic notes pipeline:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyNotes();
  }, []);

  const openNote = async (noteId) => {
    setNoteLoading(true);
    setActiveNoteId(noteId);
    try {
      const res = await axios.get(`${serverUrl}/api/notes/${noteId}`, {
        withCredentials: true,
      });

      console.log(res.data.content);

      // Pass the entire nested content object (notes, questions, options, metadata) directly downstream
      const historicPayload = {
        content: res.data.content,
      };

      if (setResult) {
        setResult(historicPayload);
      }

      setSelectedNote(res.data.content);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Error fetching historic notes pipeline:", error);
    } finally {
      setNoteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading && notesList.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold text-slate-400 bg-zinc-950 animate-pulse">
        Loading revision logs history...
      </div>
    );
  }

  const NotesNavigationList = () => (
    <div className="flex flex-col gap-2 overflow-y-auto h-[calc(100vh-12rem)] pr-1 custom-scrollbar">
      {notesList.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-6">
          No notes found.
        </p>
      ) : (
        notesList.map((note) => {
          const isActive = note._id === activeNoteId;
          return (
            <button
              key={note._id}
              onClick={() => openNote(note._id)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group cursor-pointer select-none ${
                isActive
                  ? "bg-zinc-800/90 border-zinc-700 shadow-md"
                  : "bg-zinc-900/40 border-zinc-900/60 hover:border-zinc-800 hover:bg-zinc-900/80"
              }`}
            >
              <div
                className={`mt-0.5 shrink-0 ${isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"}`}
              >
                <IoCalendarOutline size={16} />
              </div>
              <div className="overflow-hidden flex-1">
                <h4
                  className={`font-medium text-xs md:text-sm truncate transition-colors ${isActive ? "text-cyan-400 font-semibold" : "text-gray-300 group-hover:text-white"}`}
                >
                  {note.topic || "Untitled Note"}
                </h4>
                <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                  {formatDate(note.createdAt || note.updatedAt)}
                </p>
              </div>
              <IoChevronForwardCircleOutline
                size={16}
                className={`transition-all duration-200 self-center shrink-0 ${
                  isActive
                    ? "text-cyan-400 opacity-100 transform translate-x-0"
                    : "text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-gray-400 transform -translate-x-1"
                }`}
              />
            </button>
          );
        })
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen font-sans bg-zinc-950 text-white p-4 md:p-8 flex flex-col box-border">
      {/* Dynamic Header Block Layout */}
      <div className="w-full flex flex-col gap-4 border-b border-zinc-900 pb-6 mb-6 md:flex-row md:items-center md:justify-between relative">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span>📌</span> Sticky Study Logs
            </div>

            <motion.span
              initial={{ opacity: 0, y: -20, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
              whileHover={{
                y: -4,
                rotate: 0,
                scale: 1.03,
                boxShadow:
                  "0 15px 20px -5px rgba(0, 0, 0, 0.4), inset 0px 1px 2px rgba(255,255,255,0.2)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 select-none cursor-default font-sans relative overflow-hidden drop-shadow-[0_0_10px_rgba(34,211,238,0.2)] md:drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] whitespace-nowrap max-w-full shrink-0"
              style={{
                boxShadow:
                  "0 8px 16px -4px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 md:w-12 h-2.5 md:h-3 bg-zinc-700/30 backdrop-blur-xs border-b border-zinc-800/30 rotate-1" />
              <span className="text-lg md:text-2xl font-black bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-tight leading-none">
                .ExamNotes AI
              </span>
            </motion.span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Your pinned study modules and core generated lesson parameters.
          </p>
        </div>

        {/* Action Controls Panel */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden self-start mt-2 px-4 py-2.5 flex items-center gap-2 rounded-xl text-xs font-bold bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer shadow-md min-h-9.5"
          >
            <GiHamburgerMenu size={16} className="text-cyan-400" />
            <span className="uppercase tracking-wider">View All Notes</span>
          </button>

          {/* Desktop Navigation Control Bar */}
          <div className="hidden md:flex items-center gap-4 bg-zinc-900 px-4 py-2.5 rounded-2xl border border-zinc-800 shadow-lg">
            <button
              onClick={() => navigate("/")}
              className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer select-none"
              title="Go Home"
            >
              <IoHomeOutline
                size={22}
                className="hover:text-cyan-400 transition-colors"
              />
            </button>

            <button
              onClick={() => navigate("/pricing")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold text-white/90 border border-zinc-700/50 hover:bg-zinc-700/60 transition-all cursor-pointer shadow-inner select-none"
            >
              <IoDiamondOutline
                size={18}
                className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              />
              <span className="font-mono text-cyan-400 text-xs tracking-wide">
                {credits}
              </span>
              <FiPlus size={12} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      {/* Main Content Splitting Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 items-stretch">
        {/* Desktop Sidebar Column */}
        <div className="hidden md:flex flex-col gap-4 border-r border-zinc-900/50 pr-4 h-full">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">
            Log Entries
          </h3>
          <NotesNavigationList />
        </div>

        {/* Premium Cohesive Content Reader Space */}
        <div className="md:col-span-3 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-6 min-h-[50vh] flex flex-col relative overflow-hidden shadow-2xl shadow-black/40">
          {noteLoading ? (
            <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center text-cyan-400 animate-pulse font-medium z-10">
              <span className="tracking-wide text-sm">
                Syncing core lesson variables...
              </span>
            </div>
          ) : selectedNote ? (
            <div className="w-full h-full text-zinc-200 text-sm md:text-base">
              {/* Integrated component workspace passing the unified theme context downstream */}
              <div className="dark-theme-wrapper prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-strong:text-cyan-400">
                <FinalResult result={ selectedNote } />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-600 text-sm font-medium tracking-wide">
              Select an entry from your revision directory to begin scanning.
            </div>
          )}
        </div>
      </div>
      {/* Mobile Sidebar Overlay Panel via AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-900 p-5 flex flex-col gap-4 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-sm text-gray-400 uppercase tracking-wider">
                  Log Directory
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              <div className="flex items-center justify-between bg-zinc-900/60 p-2 rounded-xl border border-zinc-900 mb-2">
                <button
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                >
                  <IoHomeOutline size={16} /> Home
                </button>
                <button
                  onClick={() => {
                    navigate("/pricing");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs bg-zinc-800 px-2 py-1 rounded-lg text-cyan-400 border border-zinc-700/50 cursor-pointer"
                >
                  <IoDiamondOutline size={12} /> {credits} Credits
                </button>
              </div>

              <NotesNavigationList />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
