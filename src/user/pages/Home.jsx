import React, { useEffect } from "react";
import "./style/Home.css";
import VideoPlayer from "react-video-js-player";
import "video.js/dist/video-js.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const videoSrc = "/src/assets/video/video.mp4";
  const poster = "/src/assets/video/poster.png";

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      once: true,
      mirror: true,
      offset: 0,
      duration: 1000,
    });
  }, []);

  return (
    <div className="flex gap-5 flex-column">
      <div>
        <div className="font-bold text-2xl">Trang chủ</div>
        <div className="text-main2">
          Cập nhật các thông tin và quảng bá sản phẩm
        </div>
      </div>

      <Card>
        <div className="flex flex-column justify-content-center lg:flex-row gap-1">
          <div
            className="flex flex-column justify-content-center lg:w-6"
            data-aos="fade-down-right"
          >
            <h1 className="text-main3 text-center m-0 mb-3">
              HealthCare — chăm sóc sức khỏe theo phong cách GenZ
            </h1>
            <div className="text-main2 text-center">
              Nền tảng kết nối phòng khám, dịch vụ và sản phẩm uy tín. Giao diện
              trẻ trung, thao tác nhanh — chăm sóc sức khoẻ dễ dàng và tiện lợi.
            </div>
          </div>
          <div
            className="flex justify-content-center lg:w-6"
            data-aos="fade-up-left"
          >
            <div className="video-wrapper">
              <VideoPlayer
                src={videoSrc}
                poster={poster}
                controls={true}
                className="custom-video"
                playbackRates={[0.5, 1, 1.5, 2]}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-column justify-content-center gap-3">
        <h1 className="text-main3 text-center">
          Người dùng nói gì về HealthCare
        </h1>
        <div className="text-main2 text-center">
          Đánh giá thực tế từ người dùng giúp bạn yên tâm hơn khi chọn dịch vụ.
        </div>
        <div className="flex flex-column md:flex-row gap-3">
          <Card className="p-card1 w-full">
            <img
              src="/src/assets/anhpv1.png"
              alt=""
              className="max-w-full h-auto border-round-sm img"
            />
            <div className="text-main2 text-center mt-2">
              “Ứng dụng giúp tôi dễ dàng tìm phòng khám gần nhà.”
            </div>
            <h2 className="text-center m-2">Nguyễn Văn An</h2>
          </Card>
          <Card className="p-card1 w-full">
            <img
              src="/src/assets/anhpv2.png"
              alt=""
              className="max-w-full h-auto border-round-sm img"
            />

            <div className="text-main2 text-center mt-2">
              “Ứng dụng giúp tôi dễ dàng tìm phòng khám gần nhà.”
            </div>
            <h2 className="text-center m-2">Nguyễn Văn An</h2>
          </Card>
          <Card className="p-card1 w-full">
            <img
              src="/src/assets/anhpv3.png"
              alt=""
              className="max-w-full h-auto border-round-sm img"
            />

            <div className="text-main2 text-center mt-2">
              “Ứng dụng giúp tôi dễ dàng tìm phòng khám gần nhà.”
            </div>
            <h2 className="text-center m-2">Nguyễn Văn An</h2>
          </Card>
        </div>
        <div className="justify-content-center gap-3 hidden md:flex">
          <i className="pi pi-arrow-left text-4xl" />
          <i className="pi pi-arrow-right text-4xl" />
        </div>
      </div>

      <Card>
        <div className="flex flex-column justify-content-center gap-1">
          <h1 className="text-main3 text-center m-0 mb-3">Phòng khám uy tín</h1>
          <div className="flex flex-column md:flex-row gap-3">
            <div className="w-12 md:w-6 cursor-pointer">
              <div
                className="shadow-1 w-12 border-round-xl"
                style={{
                  padding: "0.3rem",
                  borderLeft: "3px solid #2563eb",
                }}
              >
                <div className="flex flex-column bg-white p-3 gap-1">
                  <h3 className="m-0 mb-2">Phòng khám Đa Khoa</h3>
                  <div className="text-main2">Địa chỉ: Cầu giấy, Hà Nội</div>
                  <div className="text-main2">Liên hệ: 09876543</div>
                  <div className="text-main2">Chuyên Khoa: Nội tổng quát </div>
                  <div className="flex flex-column lg:flex-row">
                    <div>
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                    </div>
                    <div className="text-main2">(4.8/5 - 380 đánh giá)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-12 md:w-6 cursor-pointer">
              <div
                className="shadow-1 w-12 border-round-xl"
                style={{
                  padding: "0.3rem",
                  borderLeft: "3px solid #2563eb",
                }}
              >
                <div className="flex flex-column bg-white p-3 gap-1">
                  <h3 className="m-0 mb-2">Phòng khám MedPlus</h3>
                  <div className="text-main2">Địa chỉ: Cầu giấy, Hà Nội</div>
                  <div className="text-main2">Liên hệ: 09876543</div>
                  <div className="text-main2">Chuyên khoa: Nhi, Da Liễu</div>
                  <div className="flex flex-column lg:flex-row">
                    <div>
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                      <i
                        className="pi pi-star text-lg"
                        style={{ color: "#C8C804" }}
                      />
                    </div>
                    <div className="text-main2">(4.8/5 - 380 đánh giá)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="lg:p-4 lg:pb-6">
        <div className="flex flex-column justify-content-center gap-1">
          <h1 className="text-main3 text-center m-0 mb-3">
            Phòng Gym & Thể Hình
          </h1>
          <div className="flex flex-column lg:flex-row gap-3 md:gap-5">
            <div className="border-round-3xl shadow-5 w-full lg:w-4">
              <img
                src="/src/assets/phonggym.png"
                alt=""
                className="max-w-full h-auto border-round-top-3xl"
              />
              <div className="text-main2 text-center py-4">
                Phòng tập của FitLife
              </div>
            </div>
            <div className="flex flex-column gap-3 lg:w-8 justify-content-center">
              <h2 className="m-0 my-2">Phòng Gym FitLife</h2>
              <div className="text-main2 text-xl">
                Địa chỉ: 132 đường Cầu Giấy, Hà Nội
              </div>
              <div className="text-main2 text-xl">Liên hệ: 0934 567 890</div>
              <div className="text-main2 font-italic">
                Mô hình phòng tập mega gym cùng hệ thống máy móc nhập khẩu hiện
                đại nhất sẽ nâng cao trải nghiệm tập gym cho bạn. Bể bơi nước
                mặn bốn mùa chính là một điểm nhấn thú vị khác không thể bỏ qua
                của phòng gym này.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card
        style={{
          background: "linear-gradient(to right, #cce2ff, #ffe6f0, #fff3d1)",
        }}
      >
        <div
          className="px-2 font-bold text-xl lg:text-2xl lg:px-8 text-center"
          style={{ color: "#6D28D9" }}
        >
          CHÚNG TÔI LUÔN TÌM TÒI HỢP TÁC VỚI CÁC NHÃN HÀNG ĐỂ MANG LẠI ƯU ĐÃI
          TRẢI NGHIỆM CÁC SẢN PHẨM TỐT NHẤT CHO NGƯỜI DÙNG
        </div>
      </Card>

      <div className="flex flex-column justify-content-center gap-3">
        <h1 className="text-main3 text-center">Sản phẩm chăm sóc sức khỏe </h1>
        <div className="flex flex-column md:flex-row gap-4">
          <Card className="cursor-pointer">
            <div className="flex flex-column w-12 hover-2">
              <img
                src="/src/assets/sanpham1.png"
                alt=""
                className="max-w-full h-auto border-round-sm"
              />
              <h2>Vitamin C 1000mg</h2>
              <div className="flex flex-row">
                <div className="text-main2 mr-auto">Giá: 299.000đ</div>
                <Button severity="danger">Mua ngay</Button>
              </div>
            </div>
          </Card>
          <Card className="cursor-pointer">
            <div className="flex flex-column w-12 hover-2">
              <img
                src="/src/assets/sanpham2.png"
                alt=""
                className="max-w-full h-auto border-round-sm"
              />
              <h2>Dầu cá Omega 3</h2>
              <div className="flex flex-row">
                <div className="text-main2 mr-auto">Giá: 599.000đ</div>
                <Button severity="danger">Mua ngay</Button>
              </div>
            </div>
          </Card>
          <Card className="hidden lg:block  cursor-pointer">
            <div className="flex flex-column w-12 hover-2">
              <img
                src="/src/assets/sanpham2.png"
                alt=""
                className="max-w-full h-auto border-round-sm"
              />
              <h2>Dầu cá Omega 3</h2>
              <div className="flex flex-row">
                <div className="text-main2 mr-auto">Giá: 599.000đ</div>
                <Button severity="danger">Mua ngay</Button>
              </div>
            </div>
          </Card>
          <Card className="hidden xl:block cursor-pointer">
            <div className="flex flex-column w-12 hover-2">
              <img
                src="/src/assets/sanpham1.png"
                alt=""
                className="max-w-full h-auto border-round-sm"
              />
              <h2>Vitamin C 1000mg</h2>
              <div className="flex flex-row">
                <div className="text-main2 mr-auto">Giá: 299.000đ</div>
                <Button severity="danger">Mua ngay</Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex justify-content-center">
          <Button
            className="hover-button"
            label="Khám phá thêm sản phẩm"
            severity="help"
            rounded
            outlined
          />
        </div>
        <div className="flex flex-column justify-content-center gap-3">
          <h1 className="text-main3 text-center">Mẹo sức khỏe & Blog</h1>
          <div className="flex flex-column md:flex-row gap-3">
            <Card
              className="blog w-full md:w-6 lg:w-4 hover-3"
              style={{ border: "1px solid #0596b3ff" }}
            >
              <div
                className="flex justify-content-center"
                style={{ background: "#079FBF" }}
              >
                <img
                  src="/src/assets/blog1.png"
                  alt=""
                  className="max-w-full"
                />
              </div>
              <div className="p-4">
                <h2 style={{ color: "#079FBF" }}>
                  5 thói quen giúp ngủ ngon hơn
                </h2>
                <div className="text-main2 mb-auto">
                  Một giấc ngủ ngon vô cùng quan trọng đối với sức khỏe và tinh
                  thần của con người. Ngủ ngon sẽ giúp bạn có một tinh thần ...
                </div>
                <div className="mt-5 flex justify-content-center">
                  <a
                    href="https://www.vinmec.com/vie/bai-viet/20-cach-don-gian-de-ngu-nhanh-va-sau-vi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="hover-button2"
                      label="Đọc thêm"
                      severity="info"
                      rounded
                      outlined
                    />
                  </a>
                </div>
              </div>
            </Card>
            <Card
              className="blog w-full md:w-6 lg:w-4 hover-3"
              style={{ border: "1px solid #0596b3ff" }}
            >
              <div
                className="flex justify-content-center"
                style={{ background: "#079FBF" }}
              >
                <img
                  src="/src/assets/blog2.png"
                  alt=""
                  className="max-w-full"
                />
              </div>
              <div className="p-4">
                <h2 style={{ color: "#079FBF" }}>
                  Thực phẩm giúp tăng đề kháng{" "}
                </h2>
                <div className="text-main2">
                  Chế độ ăn đóng vai trò quan trọng đối với hoạt động của hệ
                  miễn dịch, do đó chúng ta cần bổ sung các thực phẩm tăng sức
                  ...
                </div>
                <div className="mt-5 flex justify-content-center">
                  <a
                    href="https://www.vinmec.com/vie/bai-viet/tang-suc-de-khang-bang-cac-thuc-pham-xung-quanh-ta-vi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="hover-button2"
                      label="Đọc thêm"
                      severity="info"
                      rounded
                      outlined
                    />
                  </a>
                </div>
              </div>
            </Card>
            <Card
              className="blog hidden lg:block lg:w-4 hover-3"
              style={{ border: "1px solid #0596b3ff" }}
            >
              <div
                className="flex justify-content-center"
                style={{ background: "#079FBF" }}
              >
                <img
                  src="/src/assets/blog3.png"
                  alt=""
                  className="max-w-full"
                />
              </div>
              <div className="p-4">
                <h2 style={{ color: "#079FBF" }}>
                  Khi nào nên đi khám tổng quát?
                </h2>
                <div className="text-main2">
                  Khám sức khoẻ tổng quát nhằm đánh giá tình trạng sức khoẻ tổng
                  thể của mỗi người ở một thời điểm thông qua việc đánh giá chức
                  ...
                </div>
                <div className="mt-5 flex justify-content-center">
                  <a
                    href="https://www.vinmec.com/vie/bai-viet/nhung-dieu-can-luu-y-truoc-khi-kham-suc-khoe-tong-quat-vi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="hover-button2"
                      label="Đọc thêm"
                      severity="info"
                      rounded
                      outlined
                    />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-content-end my-3">
        <div className="card-1 mr-5 p-2 font-bold cursor-pointer">
          Nhận tư vấn miễn phí về dịch vụ của chúng tôi
        </div>
      </div>
    </div>
  );
};

export default Home;
