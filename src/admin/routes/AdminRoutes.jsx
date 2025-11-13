import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../layout/AdminLayout";
import ProtectedRoute from "../../routes/ProtectedRoute";

import SystemManager from "../pages/SystemManager";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute requireAdmin>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="system-manager" element={<SystemManager />} />
        <Route path="*" element={<SystemManager />} /> {/* fallback */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
