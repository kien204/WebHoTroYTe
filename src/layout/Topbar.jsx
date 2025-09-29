import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import logo from "../assets/logo.png";

const Topbar = ({ onMenuToggle }) => {
  const op = useRef(null);
  const navigate = useNavigate();

  const isAuth = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) return false;
    return auth.token && Date.now() < Number(auth.date);
  };

  const handleUserClick = (e) => {
    if (!isAuth()) {
      navigate("/login");
    } else {
      op.current.toggle(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="layout-topbar flex align-items-center justify-content-between px-4 py-2 surface-card border-bottom-1 surface-border">
      {/* Logo */}
      <Link to="/" className="flex align-items-center gap-2">
        <img src={logo} alt="Logo" height="36" />
        <span className="text-xl font-bold text-primary">HealthCare</span>
      </Link>

      {/* Actions */}
      <div className="flex align-items-center gap-2">
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text"
          onClick={onMenuToggle}
        />
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

        {/* Overlay user menu */}
        <OverlayPanel ref={op} className="w-16rem">
          <div className="flex flex-column gap-2 p-2">
            <Link
              to="/profile"
              className="flex align-items-center gap-2 p-2 hover:surface-hover border-round"
            >
              <i className="pi pi-user" />
              <span>Hồ sơ cá nhân</span>
            </Link>
            <Button
              label="Đăng xuất"
              onClick={handleLogout}
              className="w-full p-button-text p-button-danger"
            />
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
};

export default Topbar;
