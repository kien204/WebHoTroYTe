// MenuSidebar.jsx
import React, { useState, useRef, useContext } from "react";

import { AuthContext } from "../../common/context/AuthContext";

import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const MenuSidebar = () => {
  const menu = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const [menuSidebar] = useState([
    { name: "Trang chủ", path: "/", icon: "pi-home" },
    { name: "Chỉ số sức khỏe", path: "/health-metrics", icon: "pi-chart-bar" },
    { name: "Nhập dữ liệu", path: "/data-entry", icon: "pi-heart" },
    { name: "Trợ lý AI", path: "/ai-helper", icon: "pi-comments" },
    { name: "Báo cáo", path: "/reports", icon: "pi-home" },
    { name: "Hồ sơ sức khỏe", path: "/health-profile", icon: "pi-book" },
    { name: "Cài đặt", path: "/settings", icon: "pi-cog" },
  ]);

  const [itemsMenuFooter] = useState([
    { label: "Hồ sơ", icon: "pi pi-user", command: () => navigate("/profile") },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.clear("auth");
        navigate("/login");
      },
    },
  ]);

  return (
    <div className="h-full surface-card border-right-1 surface-border flex flex-column">
      {/* Logo */}
      <div className="flex align-items-center gap-2 p-3 surface-border">
        <i className="pi pi-heart text-4xl font-bold text-main1" />
        <div>
          <span className="font-semibold text-xl">HealthCare</span>
          <div className="text-sm text-main2">Quản lý sức khỏe thông minh</div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-3">
        {menuSidebar.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`p-3 flex align-items-center gap-3 border-round-xl ${
              location.pathname === item.path
                ? "active-sidebar"
                : "hover-sidebar"
            }`}
          >
            <i className={`pi ${item.icon} text-xl text-main2`} />
            <span className="text-main2">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <Divider className="mx" />
        <Menu model={itemsMenuFooter} popup ref={menu} id="popup_menu" />
        {auth ? (
          <div
            className="m-3 flex align-items-center cursor-pointer p-2 gap-2"
            onClick={(event) => menu.current.toggle(event)}
          >
            <Avatar
              image="https://i.pravatar.cc/100"
              shape="circle"
              size="large"
            />
            <span className="font-bold">HealthCare</span>
          </div>
        ) : (
          <div className="m-3 flex align-items-center justify-content-center p-2 gap-2">
            <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSidebar;
