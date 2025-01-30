import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
// import VerifyOtp from "./pages/VerifyOtp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
// import Chat from "./components/Chat";

import ScrollTop from "./scrollUp";
import ProgressBar from "./loadBar";
import ScrollToTop from "./components/ScrollToTop";

import Feedback from "./Feedback";
import About from "./components/AboutUs"; 

const App = () => {
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and scrolled more than 100px
        setShowNavbar(false);
      } else {
        // Scrolling up or near the top of the page
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Router>
        <ScrollTop />
        <ScrollToTop />
        <ProgressBar />
        <Navbar show={showNavbar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/post/application/:jobId"
            element={<PostApplication />}
          />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/verify-otp" element={<VerifyOtp />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/support-chat" element={<Chat />} /> */}
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
        <Feedback />
      </Router>
    </>
  );
};

export default App;
