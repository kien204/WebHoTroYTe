import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

const Topbar = ({ onMenuToggle }) => {
  return (
    <div
      className="layout-topbar flex align-items-center justify-content-between px-2 py-2"
      style={{ borderBottom: "1px solid #E3E3E3" }}
    >
      {/* Logo */}
      <Link to="/" className="flex align-items-center gap-2 md:hidden">
        <Avatar
          image="/src/assets/logo.png"
          shape="circle"
          size="large"
          className="border-round-3xl"
        />
        <span className="text-xl font-bold text-primary">HealthCare</span>
      </Link>
      <div className="mr-auto"></div>
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
