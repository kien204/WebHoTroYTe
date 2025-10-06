import React from "react";
import { Route, Routes } from "react-router-dom";

import UserRoutes from "../user/routes/UserRoutes"
import AdminRoutes from "../admin/routes/AdminRoutes";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import NotFoundPage from "../features/notfoundpage/NotFoundPage";
import ResetPassword from "../features/auth/ResetPassword";
import ForgotPassword from "../features/auth/ForgotPassword";
import TermsOfService from "../user/pages/TermsOfService";
import Demo3 from "../demo/demo-quiz/QuizApp";


const RouterCustom = () => {
  return (
    <Routes>
      {/* Trang công khai không dùng Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/demo-3" element={<Demo3 />} />

      {/* User routes */}
      <Route path="/*" element={<UserRoutes />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterCustom;
