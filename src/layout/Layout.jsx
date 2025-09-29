import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import MenuSidebar from "./Sidebar";
import SetupInfoModal from "../features/setupinfomodal/SetupInfoModal";
import axios from "axios";

const Layout = ({ children }) => {
  const [showSetup, setShowSetup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) {
      axios
        .get("/api/user/profile", {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
          setUser(res.data);
          if (!res.data.name || !res.data.age || !res.data.gender) {
            setShowSetup(true);
          }
        })
        .catch(() => {
          localStorage.removeItem("auth");
        });
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-18rem bg-white border-right-1 surface-border">
        <MenuSidebar />
      </div>

      <div className="flex flex-column flex-1">
        <div className="flex-1 p-4 surface-ground overflow-auto">
          {children}
        </div>
        <Footer />
      </div>

      {true && (
        <SetupInfoModal onClose={() => setShowSetup(false)} />
      )}
    </div>
  );
};

export default Layout;
