import React from "react";
import Header from "../pages/Header"; 
import Footer from "../pages/Footer"

import { Outlet } from "react-router-dom"; // ✅ Allows nested routes to be displayed


const ProtectedLayout = () => {
  return (
    <>
      <Header /> {/* ✅ Header is shown on all protected pages */}
      <div className="container mt-5">
        <Outlet /> {/* ✅ This renders the current protected route */}
      </div>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
