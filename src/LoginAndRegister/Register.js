import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("/api/auth/register-users", formData);

        if (response.data.success) {
            console.log("Token:", response.data.token);
            sessionStorage.setItem("token", response.data.token); // ✅ Store token in sessionStorage
            toast.success("Registration successful! Please log in.", { position: "top-right", autoClose: 3000 }); // ✅ Success message
            navigate("/");
        } else {
            toast.error("Unexpected error occurred.", { position: "top-right", autoClose: 5000 }); // ✅ Error message
        }
    } catch (error) {
        console.error("Error:", error);
        setErrorMessages(error.response?.data?.errors || {});
        toast.error("Registration failed! Please check your input.", { position: "top-right", autoClose: 5000 }); // ✅ Error handling
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(https://img.freepik.com/premium-photo/hospital-front-view-exterior-isolated-background-with-ambulance_926199-3084563.jpg?w=2000)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <ToastContainer />
      <div className="card p-4 shadow-lg text-white" style={{ width: "800px", borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <h2 className="text-center mb-4" style={{ fontSize: "32px", fontWeight: "bold" }}>Register</h2>
        
        <form onSubmit={handleRegister} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="username" className="form-label fs-5 fw-bold">Username:</label>
            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="form-control" required placeholder="Enter username" />
            {errorMessages.username && <p className="text-danger">{errorMessages.username[0]}</p>}
          </div>

          <div className="col-md-6">
            <label htmlFor="firstname" className="form-label fs-5 fw-bold">First Name:</label>
            <input id="firstname" name="firstname" type="text" value={formData.firstname} onChange={handleChange} className="form-control" required placeholder="Enter first name" />
            {errorMessages.firstname && <p className="text-danger">{errorMessages.firstname[0]}</p>}
          </div>

          <div className="col-md-6">
            <label htmlFor="lastname" className="form-label fs-5 fw-bold">Last Name:</label>
            <input id="lastname" name="lastname" type="text" value={formData.lastname} onChange={handleChange} className="form-control" required placeholder="Enter last name" />
            {errorMessages.lastname && <p className="text-danger">{errorMessages.lastname[0]}</p>}
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label fs-5 fw-bold">Email:</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="Enter email" />
            {errorMessages.email && <p className="text-danger">{errorMessages.email[0]}</p>}
          </div>

          <div className="col-md-12">
            <label htmlFor="password" className="form-label fs-5 fw-bold">Password:</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="form-control" required placeholder="Enter password" />
            {errorMessages.password && <p className="text-danger">{errorMessages.password[0]}</p>}
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary w-50 py-2 fs-5 fw-bold">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
