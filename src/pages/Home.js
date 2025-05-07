import React, { useEffect } from "react";
import Header from "../pages/Header"; // ✅ Corrected import path
import DoctorsList from "../pages/DoctorList"; // ✅ Ensure correct path
import About from "../pages/About"; // ✅ Ensure correct path
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header /> 
      <div className="container mt-5">
        <h2 className="text-center mb-4">Welcome to Our Hospital Management System</h2>

        
        <div className="fade-in">
          <DoctorsList /> 
        </div>

        <div className="fade-in">
          <About /> 
        </div>
      </div>
    </>
  );
};

export default Home;
