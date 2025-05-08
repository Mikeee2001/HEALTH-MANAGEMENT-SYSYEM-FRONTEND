import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/Api";
import useAuth from "../ProtectedRoutes/useAuth"; // ✅ Import Auth Context

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Added loading state

    const { setUser, setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", { email, password }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data?.success && response.data?.token) {
                sessionStorage.setItem("token", response.data.token); // ✅ Store token temporarily
                sessionStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user session info

                setToken(response.data.token);
                setUser(response.data.user);

                navigate("/home");
            } else {
                setErrorMessage(response.data?.message || "Unexpected error occurred.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage(error.response?.data?.message || "Invalid credentials.");
        } finally {
            setLoading(false); // ✅ Allow button click again after response
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(https://img.freepik.com/premium-photo/hospital-front-view-exterior-isolated-background-with-ambulance_926199-3084563.jpg?w=2000)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div className="card p-4 shadow-lg text-white" 
                style={{ width: "350px", borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                <h2 className="text-center mb-4" 
                    style={{ fontSize: "32px", fontWeight: "bold" }}>Login</h2>
                {errorMessage && <p className="text-danger fs-5 fw-bold">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fs-5 fw-bold">Email:</label>
                        <input id="email" name="email" type="email" value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control" required placeholder="Enter email" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fs-5 fw-bold">Password:</label>
                        <input id="password" name="password" type="password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-control" required placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 fs-5 fw-bold" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
