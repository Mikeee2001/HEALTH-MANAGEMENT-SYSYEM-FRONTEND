import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ?  <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
