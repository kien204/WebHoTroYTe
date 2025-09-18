import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import App from "../demo/demo-dataview/demo-dataview";
import App2 from "../demo/demo-chatbot/demo-chatbot";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import NotFoundPage from "../features/notfoundpage/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../features/auth/ResetPassword";
import ForgotPassword from "../features/auth/ForgotPassword";
import Profile from "../features/profile/Profile";
const RouterCustom = () => {
  const privateRouters = [
    { path: "/a", component: <App2 /> },
    { path: "/profile", component: <Profile /> },
  ];

  const publicRouters = [{ path: "/", component: <App /> }];

  return (
    <Routes>
      {/* Trang công khai không dùng Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

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
