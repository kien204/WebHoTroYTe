import React from "react";

const Home = () => {
  return (
    
    <div className="flex flex-column">
      <div>
        <div className="font-bold text-2xl">
          Nhập dữ liệu sức khỏe cho ngày{" "}
          {new Date().toLocaleDateString("vi-VN")}
        </div>
        <div className="text-main2 mb-3">
          Dữ liệu được bảo mật tuyệt đối – chỉ dùng để cá nhân hóa tư vấn sức
          khỏe
        </div>
      </div>
    </div>
  );
};

export default Home;
