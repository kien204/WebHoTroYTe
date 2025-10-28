import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const Footer = () => {
  const [value2, setValue2] = useState("");

  return (
    <div
      className="flex flex-column gap-5 py-4 px-5"
      style={{ background: "#0054A6" }}
    >
      <div className="flex flex-column md:flex-row gap-7">
        <div className="flex flex-column gap-4">
          <div className="flex flex-row align-items-center gap-3">
            <img
              src="/src/assets/logo.png"
              alt=""
              className="max-h-full h-5rem"
            />
            <div className="font-bold text-xl text-white">
              HealthCare - Nền tảng chăm sóc sức khỏe cho mọi người
            </div>
          </div>
          <div className="flex gap-3">
            <i className="pi pi-map-marker text-white" />
            <span className="text-white">
              Tầng 2, nhà C, 136 Xuân Thủy, Cầu Giấy, Hà Nội
            </span>
          </div>
          <div className="flex gap-3">
            <i className="pi pi-whatsapp text-white" />
            <span className="text-white">098765432</span>
          </div>
          <div className="flex gap-3">
            <i className="pi pi-envelope text-white" />
            <span className="text-white">healthcare@gmail.com</span>
          </div>
          <div className="flex gap-3">
            <i className="pi pi-globe text-white" />
            <span className="text-white">https://healthcare.vn</span>
          </div>
        </div>
        <div className="flex flex-column gap-4">
          <div className="font-bold text-xl text-white">
            Góp ý với về chúng tôi
          </div>
          <InputTextarea
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            rows={5}
            cols={30}
            placeholder="Góp ý"
            className="w-full"
          />
          <div>
            <Button severity="warning">Gửi</Button>
          </div>
        </div>
      </div>
      <div className="text-center text-white">
        © 2025 Nhóm 5 CĐTN - Trường Đại học Sư phạm Hà Nội
      </div>
    </div>
  );
};

export default Footer;
