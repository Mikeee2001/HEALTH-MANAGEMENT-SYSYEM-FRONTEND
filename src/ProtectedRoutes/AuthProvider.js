import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      const storedToken = sessionStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser)); // ✅ Prevents errors on JSON parsing
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error retrieving user session:", error);
    }
  }, []);

  const login = (userData, authToken) => {
    sessionStorage.removeItem("user"); // ✅ More precise session clearing
    sessionStorage.removeItem("token");

    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", authToken);

    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    sessionStorage.removeItem("user"); // ✅ Prevents clearing unrelated session data
    sessionStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
