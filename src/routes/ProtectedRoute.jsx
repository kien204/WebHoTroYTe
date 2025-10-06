import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../common/context/AuthContext";
import NotFoundPage from "../features/notfoundpage/NotFoundPage";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { auth, token } = useContext(AuthContext);

  if (!auth || !token) {
    // Chưa login → redirect
    console.log(auth, token);

    return <Navigate to="/login" replace />;
  }

  // Nếu là admin page mà user thường vào → logout
  if (requireAdmin && auth.role !== "admin") {
    return <NotFoundPage />;
  }

  // Nếu là user page mà admin vào → logout
  if (!requireAdmin && auth.role === "admin") {
    return <NotFoundPage />;
  }

  return children;
};

export default ProtectedRoute;
