import React, { memo, useState } from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children, ...props }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="flex flex-column min-h-screen" {...props}>
      {/* Topbar */}
      <Topbar onMenuToggle={() => setSidebarVisible(true)} />

      {/* Body */}
      <div className="flex flex-row flex-1">
        {/* Sidebar */}
        <Sidebar
          visible={sidebarVisible}
          onHide={() => setSidebarVisible(false)}
        />

        {/* Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default memo(Layout);
