import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-column align-items-center justify-content-center mt-8">
      {/* Logo */}
      <img src={logo} alt="Logo" className="mb-5 w-6rem flex-shrink-0" />

      {/* Card */}
      <div
        className="flex flex-column align-items-center px-5 py-5 w-full"
        style={{
          maxWidth: "28rem",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* 404 code */}
        <span className="text-primary font-bold text-5xl mb-2">404</span>

        {/* Title */}
        <h1 className="text-900 font-bold mb-2">Không tìm thấy</h1>

        {/* Subtitle */}
        <div className="text-600 mb-4">Trang này không có trong hệ thống</div>

        {/* Link quay về */}
        <Link
          to="/"
          className="flex align-items-center no-underline text-cyan-500 hover:text-cyan-700 w-full"
        >
          {/* Icon */}
          <span
            className="flex align-items-center justify-content-center w-3rem h-3rem border-circle mr-2 transition-colors"
            style={{ backgroundColor: "#00bcd4" }}
          >
            <i className="pi pi-arrow-left text-white text-2xl"></i>
          </span>

          {/* Text */}
          <h2 className="m-0">Quay về trang chủ</h2>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
