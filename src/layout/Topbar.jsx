import React, { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import logo from "../assets/logo.png";
import { OverlayPanel } from "primereact/overlaypanel";

const Topbar = ({ onMenuToggle }) => {
  const op = useRef(null);
  const navigate = useNavigate();

  const CheckAuth = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) return false;
    const now = Date.now();
    return auth.token && now < Number(auth.date);
  };

  const handleUserClick = (e) => {
    if (!CheckAuth()) {
      navigate("/login");
    } else {
      op.current.show(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="layout-topbar flex align-items-center justify-content-between px-4 py-2 surface-card shadow-2">
      {/* Logo */}
      <Link to="/" className="layout-topbar-logo flex align-items-center gap-2">
        <img src={logo} alt="Logo" height="40" />
        <span className="text-xl font-bold">Free Fire</span>
      </Link>

      <Button
        icon="pi pi-bars"
        className="p-button-rounded p-button-text"
        onClick={onMenuToggle}
      />

      {/* Right actions */}
      <div className="flex align-items-center gap-3">
        <Button
          icon="pi pi-search"
          className="p-button-rounded p-button-text"
        />
        <Button icon="pi pi-bell" className="p-button-rounded p-button-text" />
        <Button
          icon="pi pi-user"
          className="p-button-rounded p-button-text"
          onClick={handleUserClick}
        />
        <OverlayPanel ref={op} className="w-20rem">
          <div className="flex flex-column align-items-center p-3">
            <Link to="profile" className="w-full flex">
              <div>
                <i className="pi pi-user mr-2" />
                <span className="font-bold">Hồ sơ cá nhân</span>
              </div>
            </Link>
            <hr className="mb-3 border-top-1 border-none surface-border w-full" />
            <Button
              label="Đăng xuất"
              onClick={handleLogout}
              className="w-full"
            />
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
};

export default Topbar;
