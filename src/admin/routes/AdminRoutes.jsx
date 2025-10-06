import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../../routes/ProtectedRoute";

import Home from "../pages/Home";
import SystemManager from "../pages/SystemManager";

const AdminRoutes = () => {
  const adminRouters = [
    { path: "/", component: <Home /> },
    { path: "/system-manager", component: <SystemManager /> },
  ];

  return (
    <Routes>
      {adminRouters.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={
            // <ProtectedRoute requireAdmin>
            //   <AdminLayout>{item.component}</AdminLayout>
            // </ProtectedRoute>
            <AdminLayout>{item.component}</AdminLayout>
          }
        />
      ))}
    </Routes>
  );
};

export default AdminRoutes;
