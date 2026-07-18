import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./services/api";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={userData ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/history"
        element={userData ? <History /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/notes"
        element={userData ? <Notes /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/pricing"
        element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/aboutUs"
        element={userData ? <AboutUs /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/Blog"
        element={userData ? <Blog /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/contact"
        element={userData ? <Contact /> : <Navigate to="/auth" replace />}
      />
    </Routes>
  );
};

export default App;
