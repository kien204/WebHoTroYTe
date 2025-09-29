import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Demo1 from "../demo/demo-dataview/demo-dataview";
import Demo2 from "../demo/demo-chatbot/demo-chatbot";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import NotFoundPage from "../features/notfoundpage/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../features/auth/ResetPassword";
import ForgotPassword from "../features/auth/ForgotPassword";
import Profile from "../features/Profile/Profile";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import AiHelper from "../pages/AiHelper/AiHelper";
import HealthMetrics from "../pages/HealthMetrics/HealthMetrics";
import DataEntry from "../pages/DataEntry/DataEntry";
import Reports from "../pages/Reports/Reports";
import HealthProfile from "../pages/HealthProfile/HealthProfile";
import Settings from "../pages/Settings/Settings";
import Home from "../pages/home/Home";
import Demo3 from "../demo/demo-quiz/QuizApp";

const RouterCustom = () => {
  const privateRouters = [
    { path: "/a", component: <Demo2 /> },
    // { path: "/profile", component: <Profile /> },
  ];

  const publicRouters = [
    { path: "/", component: <Home /> },
    { path: "/profile", component: <Profile /> },
    { path: "/ai-helper", component: <AiHelper /> },
    { path: "/health-metrics", component: <HealthMetrics /> },
    { path: "/data-entry", component: <DataEntry /> },
    { path: "/reports", component: <Reports /> },
    { path: "/health-profile", component: <HealthProfile /> },
    { path: "/settings", component: <Settings /> },
    // { path: "/", component: <Home /> }
  ];

  return (
    <Routes>
      {/* Trang công khai không dùng Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/demo-3" element={<Demo3 />} />

      {/* Trang công khai nhưng vẫn dùng Layout */}
      {publicRouters.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={<Layout>{item.component}</Layout>}
        />
      ))}

      {/* Trang private cần đăng nhập + Layout */}
      {privateRouters.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={
            <ProtectedRoute>
              <Layout>{item.component}</Layout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterCustom;
