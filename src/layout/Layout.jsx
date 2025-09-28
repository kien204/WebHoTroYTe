import React, { memo } from "react";
import Footer from "./Footer";
import MenuSidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-column md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-18rem">
        <MenuSidebar />
      </div>

      {/* Content */}
      <div className="flex flex-column flex-1 min-h-screen">
        <div className="flex-1 surface-ground p-4">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default memo(Layout);
