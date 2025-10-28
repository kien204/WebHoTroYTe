import React from "react";

const Home = () => {
  return (
    <div className="flex flex-column">
      <div>
        <div className="font-bold text-2xl">Chào mừng trở lại</div>
        <div className="text-main2 mb-3">Theo dõi sức khỏe của bạn hôm nay</div>
        <div>{new Date().toLocaleDateString("vi-VN")}</div>
      </div>
    </div>
  );
};

export default Home;
