import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";
import Navbar from "./components/Navbar";
import ManageCompanies from "./pages/ManageCompanies";
import LandingPage from "./pages/LandingPage";
function App() {

  // 🔥 AUTO LOGOUT WHEN USER LEAVES SITE
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddCompany />} />
        <Route path="/manage" element={<ManageCompanies />} />
        <Route path="/edit/:id" element={<EditCompany />} />
      </Routes>
    </Router>
  );
}

export default App;