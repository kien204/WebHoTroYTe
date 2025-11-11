import React, { useEffect, useState, useContext } from "react";
import Footer from "../../common/layout/Footer";
import Topbar from "../../common/layout/Topbar";
import MenuSidebar from "./UserSidebar";
import SetupInfoModal from "../../features/setupinfomodal/SetupInfoModal";
import { AuthContext } from "../../common/context/AuthContext";

const Layout = ({ children }) => {
  const { auth, updateUser } = useContext(AuthContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Disable scroll khi sidebar mobile mở
  useEffect(() => {
    document.body.style.overflow = sidebarVisible ? "hidden" : "auto";
  }, [sidebarVisible]);

  // Đóng modal và cập nhật localStorage
  const handleCloseSetup = () => {
    if (auth) {
      const updatedUser = { ...auth, check: true };
      updateUser(updatedUser); // đồng bộ cả context + localStorage
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block bg-white border-r surface-border min-h-screen flex-shrink-0">
        <MenuSidebar />
      </div>

      <div className="flex flex-column min-h-screen w-full">
        <Topbar onMenuToggle={() => setSidebarVisible(true)} />
        <div className="flex-1 overflow-auto">
          <div className="p-4  bg-main4">{children}</div>
          <Footer />
        </div>
      </div>

      {sidebarVisible && (
        <div className="fixed inset-0 z-5 flex md:hidden">
          <div
            className="absolute h-screen w-screen bg-main2 opacity-70"
            onClick={() => setSidebarVisible(false)}
          />
          <div className="relative min-h-screen bg-white shadow-2 z-10 animate-slide-in">
            <MenuSidebar />
          </div>
        </div>
      )}

      {auth && !auth.check && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <SetupInfoModal onClose={handleCloseSetup} />
        </div>
      )}
    </div>
  );
};

export default Layout;
