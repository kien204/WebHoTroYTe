import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../common/context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { auth } = useContext(AuthContext);
  if (!auth || !auth.role) {
    return <Navigate to="/login" replace />;
  }

  // Nếu là admin page mà user thường vào → logout
  if (requireAdmin && auth.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Nếu là user page mà admin vào → logout
  if (!requireAdmin && auth.role === "admin") {
    return <Navigate to="/admin" replace />; // Điều hướng admin về trang admin
  }

  return children;
};

export default ProtectedRoute;
