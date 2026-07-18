import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { IoDiamondOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const credits = userData.user.credits;

  const handelSignOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="relative z-20 mt-6 mx-6 rounded-2xl 
    bg-linear-to-r from-black/90 via-black/70 to-black/90 
    backdrop-blur-2xl border border-white/10
    shadow-[0_22px_55px_rgba(0,0,0,0.75)]
    flex items-center justify-between px-8 py-4
    "
    >
      <motion.div
        whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 1.05 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
        className="flex items-center justify-center gap-3"
      >
        <img src="/logo.png" alt="logo" className="h-9 w-9" />
        <span className="text-lg hidden md:block font-semibold text-white  ">
          ExamNotes-<span className="text-gray-300 ">AI</span>
        </span>
      </motion.div>
      <div className="flex items-center relative gap-6">
        <div className="relative">
          <motion.div
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-white/10 border border-white/20
           text-white text-sm shadow-md cursor-pointer"
          >
            <span>
              <IoDiamondOutline size={20} className="text-cyan-500" />
            </span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus size={20} className="text-white" />
            </motion.span>
          </motion.div>
          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute mt-4 w-64 right-[-60px] rounded-2xl  bg-black/90
    backdrop-blur-xl border border-white/10
    shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-4 text-white "
              >
                <h4 className="font-semibold mb-2">Buy Credits</h4>
                <p className="font-sm text-gray-300 mb-4">
                  Use credits to generate AI notes , diagrams & PDFs
                </p>
                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/pricing");
                  }}
                  className="w-full py-2 rounded-lg bg-linear-to-r from-white/90 
                 to-gray-400 text-black font-semibold hover:opacity-80 "
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-2 py-2 rounded-4xl bg-white/10 border border-white/20
           text-white text-sm shadow-md cursor-pointer"
          >
            <span>
              <FaUserCircle size={24} className="text-gray-200" />
            </span>
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute mt-4 w-50 -right-2.5 rounded-2xl  bg-black/90
    backdrop-blur-xl border border-white/10
    shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-4 text-white "
              >
                <h1 className="text-sm font-bold text-gray-300 capitalize mb-5">
                  {userData.user.name.trim().charAt(0).toUpperCase() +
                    userData.user.name.trim().slice(1)}
                </h1>
                <MenuItem
                  text="History"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/history");
                  }}
                />
                <div className="h-px bg-white/10 mx-3" />
                <MenuItem text="Sign Out" onClick={handelSignOut} red />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`
        w-full text-left px-5 py-3 text-sm
        transition-colors rounded-lg cursor-pointer
        ${
          red
            ? "text-red-400 hover:bg-red-500/10"
            : "text-gray-200 hover:bg-white/10"
        }
        `}
    >
      {text}
    </div>
  );
}

export default Navbar;
