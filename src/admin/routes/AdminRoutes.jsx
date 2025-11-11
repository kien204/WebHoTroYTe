import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../../routes/ProtectedRoute";

import SystemManager from "../pages/SystemManager";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/system-manager" element={<SystemManager />} />
        <Route path="*" element={<SystemManager />} /> {/* fallback */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
