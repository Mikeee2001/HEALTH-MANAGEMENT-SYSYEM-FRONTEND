import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/Api"; // ✅ Import Axios instance
import useAuth from "../ProtectedRoutes/useAuth"; // ✅ Import Auth Context

const Header = () => {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      const token = sessionStorage.getItem("token"); 

      if (!token) {
        toast.error("No authentication token found!", { position: "top-right", autoClose: 5000 });
        return;
      }

      await api.post("/api/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ✅ Remove user session correctly
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      setUser(null);
      setToken(null);

      toast.success("Logout successful!", { position: "top-right", autoClose: 3000 });

      // ✅ Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error) {
      console.error("Logout error:", error.response);
      toast.error("Logout failed. Please try again.", { position: "top-right", autoClose: 5000 });
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to={user ? "/home" : "/"}>
          HealthCare System
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* ✅ Show only Login/Register when user is NOT logged in */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>     
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/doctors">Doctors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/view-appointment">Appointments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold" to="/about">About</Link>
                </li>

                {/* ✅ Show Logout button when user is logged in */}
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light fw-bold ms-3 px-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Header;
