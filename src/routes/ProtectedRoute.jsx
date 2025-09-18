import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // hoặc từ Context/Redux

  if (!token) {
    return <Navigate to="/login" replace />; // chưa login → chuyển về login
  }

  return children; // đã login → cho phép truy cập
};

export default ProtectedRoute;
