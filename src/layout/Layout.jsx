import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import MenuSidebar from "./Sidebar";
import SetupInfoModal from "../features/setupinfomodal/SetupInfoModal";

const Layout = ({ children }) => {
  const [showSetup, setShowSetup] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Disable scroll khi sidebar mobile mở
  useEffect(() => {
    document.body.style.overflow = sidebarVisible ? "hidden" : "auto";
  }, [sidebarVisible]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block w-[18rem] bg-white border-r surface-border min-h-screen flex-shrink-0">
        <MenuSidebar />
      </div>

      <div className="flex flex-column flex-1">
        <Topbar onMenuToggle={() => setSidebarVisible(true)} />
        <div className="flex-1 p-4 overflow-auto surface-ground">
          {children}
        </div>
        <Footer />
      </div>

      {sidebarVisible && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute h-screen w-screen bg-main2 opacity-70"
            onClick={() => setSidebarVisible(false)}
          />
          <div className="relative w-[18rem] min-h-screen bg-white shadow-2 z-10 animate-slide-in">
            <MenuSidebar />
          </div>
        </div>
      )}

      {showSetup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <SetupInfoModal onClose={() => setShowSetup(false)} />
        </div>
      )}
    </div>
  );
};

export default Layout;
