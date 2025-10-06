import React from "react";

const Footer = () => {
  return (
    <footer className="flex align-items-center justify-content-between p-3 surface-card border-top-1 surface-border">
      <span className="text-sm">
        © 2025 HealthCare - Quản lý sức khỏe thông minh
      </span>
      <a
        href="https://github.com/primefaces/sakai-react"
        target="_blank"
        rel="noreferrer"
        className="text-xl text-color-secondary"
      >
        <i className="pi pi-github"></i>
      </a>
    </footer>
  );
};

export default Footer;
