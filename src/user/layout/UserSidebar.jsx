import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../common/context/AuthContext";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import logo from "../../assets/logo.png";

const MenuSidebar = () => {
  const menu = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, auth, profile } = useContext(AuthContext);

  const [menuSidebar] = useState([
    { name: "Trang chủ", path: "/", icon: "pi-home" },
    { name: "Tổng quan", path: "/over-view", icon: "pi-chart-bar" },
    { name: "Nhập dữ liệu", path: "/data-entry", icon: "pi-chart-line" },
    {
      name: "Thiết lập cảnh báo",
      path: "/set-up-alerts",
      icon: "pi-pen-to-square",
    },
    {
      name: "Cảnh báo & nhắc nhở",
      path: "/warning-and-reminder",
      icon: "pi-exclamation-triangle",
    },
    { name: "Trợ lý AI", path: "/ai-helper", icon: "pi-comments" },
    { name: "Báo cáo", path: "/reports", icon: "pi-book" },
    // có thể thêm nhiều mục tùy ý
  ]);

  const [itemsMenuFooter] = useState([
    {
      label: "Hồ sơ",
      icon: "pi pi-user",
      command: () => navigate("/health-profile"),
    },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => logout(),
    },
  ]);

  return (
    <div
      className="surface-card flex flex-column custom-scrollbar"
      style={{
        borderRight: "1px solid #E3E3E3",
        height: "100vh",
        overflowY: "auto", // ✅ cuộn toàn sidebar
        scrollbarWidth: "thin",
      }}
    >
      {/* Logo */}
      <div className="flex align-items-center gap-2 p-3 surface-border flex-shrink-0">
        <Link to="/" className="flex align-items-center gap-2">
          <img src={logo} alt="Logo" height="36" />
          <div>
            <span className="font-semibold text-xl">HealthCare</span>
            <div className="text-sm text-main2">
              Quản lý sức khỏe thông minh
            </div>
          </div>
        </Link>
      </div>

      {/* Danh sách menu */}
      <div className="flex-1 p-3">
        {menuSidebar.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`p-3 flex align-items-center gap-3 border-round-xl transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-main1 text-white"
                : "hover:bg-main4 text-main2"
            }`}
          >
            <i
              className={`pi ${item.icon} text-xl ${
                location.pathname === item.path ? "text-white" : "text-main2"
              }`}
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 mt-auto">
        <Divider className="mx" />
        <Menu model={itemsMenuFooter} popup ref={menu} id="popup_menu" />

        {auth ? (
          <div
            className="m-3 flex align-items-center cursor-pointer p-2 gap-2 hover:bg-main4 border-round-xl transition-all duration-200"
            onClick={(event) => menu.current.toggle(event)}
          >
            <Avatar
              image={
                profile?.avatarUrl ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
              shape="circle"
              size="large"
            />
            <div className="font-bold text-main2">
              {profile?.fullName || "Người dùng"}
              <div className="opacity-40 text-sm">{auth?.email}</div>
            </div>
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
