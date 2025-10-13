import React from "react";
import { Route, Routes } from "react-router-dom";

import UserLayout from "../layout/UserLayout";
import ProtectedRoute from "../../routes/ProtectedRoute";

import NotFoundPage from "../../features/notfoundpage/NotFoundPage";
import Demo2 from "../../demo/demo-chatbot/demo-chatbot";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AiHelper from "../pages/AiHelper";
import HealthMetrics from "../pages/HealthMetrics";
import DataEntry from "../pages/DataEntry";
import Reports from "../pages/Reports";
import HealthProfile from "../pages/HealthProfile";
import Settings from "../pages/Settings";

const UserRoutes = () => {
  const privateRouters = [
    { path: "/a", component: Demo2 },
    { path: "/profile", component: Profile },
  ];

  const publicRouters = [
    { path: "/", component: Home },
    { path: "/ai-helper", component: AiHelper },
    { path: "/health-metrics", component: HealthMetrics },
    { path: "/data-entry", component: DataEntry },
    { path: "/reports", component: Reports },
    { path: "/health-profile", component: HealthProfile },
    { path: "/settings", component: Settings },
  ];

  return (
    <Routes>
      {publicRouters.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={
            <UserLayout>
              <item.component />
            </UserLayout>
          }
        />
      ))}
      {privateRouters.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={
            <ProtectedRoute>
              <UserLayout>
                <item.component />
              </UserLayout>
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
