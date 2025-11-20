import React from "react";
import { Route, Routes } from "react-router-dom";

import UserLayout from "../layout/UserLayout";
import ProtectedRoute from "../../routes/ProtectedRoute";

import NotFoundPage from "../../features/notfoundpage/NotFoundPage";
import Demo2 from "../../demo/demo-chatbot/demo-chatbot";
import OverView from "../pages/OverView";
import Home from "../pages/Home";
import AiHelper from "../pages/AIHelper";
import DataEntry from "../pages/DataEntry";
import Reports from "../pages/Reports";
import HealthProfile from "../pages/HealthProfile";
import SetUpAlerts from "../pages/SetUpAlerts";
import WarningAndReminder from "../pages/WarningAndReminder";

const UserRoutes = () => {
  const privateRouters = [
    { path: "/over-view", component: OverView },
    { path: "/ai-helper", component: AiHelper },
    { path: "/data-entry", component: DataEntry },
    { path: "/reports", component: Reports },
    { path: "/warning-and-reminder", component: WarningAndReminder },
    { path: "/set-up-alerts", component: SetUpAlerts },
    { path: "/health-profile", component: HealthProfile },
  ];

  const publicRouters = [{ path: "/", component: Home }];

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
