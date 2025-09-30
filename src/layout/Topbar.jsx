import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import logo from "../assets/logo.png";

const Topbar = ({ onMenuToggle }) => {
  return (
    <div className="layout-topbar flex align-items-center justify-content-between px-2 py-2 surface-card border-bottom-1 surface-border">
      {/* Logo */}
      <Link to="/" className="flex align-items-center gap-2">
        <img src={logo} alt="Logo" height="36" />
        <span className="text-xl font-bold text-primary">HealthCare</span>
      </Link>

      {/* Actions */}
      <div className="flex align-items-center gap-2">
        <Button icon="pi pi-bell" className="p-button-rounded p-button-text" />
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text block md:hidden"
          onClick={onMenuToggle}
        />
      </div>
    </div>
  );
};

export default Topbar;
