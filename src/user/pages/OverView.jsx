import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart as ChartJS } from "chart.js";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

import anh from "../../assets/anh1.png";

import BMIGauge from "../../common/components/BMIGauge";

import {
  Frown,
  Moon,
  Bed,
  Siren,
  HeartPulse,
  Stethoscope,
  Droplets,
  HandHeart,
  ClipboardPenLine,
  TrendingUp,
  ThumbsUp,
  Utensils,
  MoonStar,
} from "lucide-react";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";

ChartJS.register(zoomPlugin);

const Home = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 90;
  else if (width < 1024) tableWidthPx = width - 370;
  else tableWidthPx = width - 620;

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const data = {
      labels: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
      ],
      datasets: [
        {
          label: "Huyết áp tâm thu (SYS)",
          data: [120, 122, 121, 124, 119, 118, 123],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          label: "Huyết áp tâm trương (DIA)",
          data: [78, 80, 77, 76, 79, 81, 78],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true, // cho phép zoom bằng cuộn chuột
            },
            pinch: {
              enabled: true, // cho phép zoom bằng 2 ngón trên mobile
            },
            mode: "x", // zoom theo trục X
          },
          pan: {
            enabled: true, // cho phép kéo để di chuyển
            mode: "x", // kéo ngang
          },
          limits: {
            x: { min: "original", max: "original" },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex flex-column gap-4">
      <div>
        <div className="font-bold text-2xl">Chào mừng trở lại</div>
        <div className="text-main2 mb-2 mt-2">
          Theo dõi sức khỏe của bạn hôm nay
        </div>
        <div className="text-main2 ">
          <i className="pi pi-calendar-clock mr-2"></i>
          {new Date().toLocaleDateString("vi-VN")}
        </div>
      </div>

      <Card>
        <div className="flex flex-column xl:flex-row gap-4">
          <div className="flex flex-column md:flex-row gap-4 w-full">
            <div className="card-1 p-3 w-full">
              <div className="w-full flex justify-content-between">
                <span className="text-black">Huyết áp</span>
                <i className="pi pi-chart-line"></i>
              </div>
              <div className="mt-3">140/80</div>
              <div className="w-full flex justify-content-between">
                <div className="text-xs text-main2">mmHg - Bình thường</div>
                <div>
                  <i className="pi pi-thumbs-up text-xs mr-2 opacity-60"></i>
                  <span className="text-xs opacity-60">Tốt</span>
                </div>
              </div>
            </div>
            <div className="card-4 p-3 w-full">
              <div className="w-full flex justify-content-between">
                <span className="text-black">Nhịp tim</span>
                <i className="pi pi-heart"></i>
              </div>
              <div className="mt-3">72</div>
              <div className="w-full flex justify-content-between">
                <div className="text-xs text-main2">BPM - Tốt</div>
                <div>
                  <i className="pi pi-arrow-up-right text-xs mr-2 opacity-60"></i>
                  <span className="text-xs opacity-60">Cải thiện</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-column md:flex-row gap-4 w-full">
            <div className="card-3 p-3 w-full">
              <div className="w-full flex justify-content-between">
                <span className="text-black">Đường huyết</span>
                <i className="pi pi-wave-pulse"></i>
              </div>
              <div className="mt-3">100 mg/Dl</div>
              <div className="w-full flex justify-content-between">
                <div className="text-xs text-main2">Ổn định</div>
                <div>
                  <i className="pi pi-thumbs-up text-xs mr-2 opacity-60"></i>
                  <span className="text-xs opacity-60">Tốt</span>
                </div>
              </div>
            </div>
            <div className="card-2 p-3 w-full">
              <div className="w-full flex justify-content-between">
                <span className="text-black">Giấc ngủ</span>
                <i className="pi pi-moon"></i>
              </div>
              <div className="mt-3">7.5 giờ</div>
              <div className="w-full flex justify-content-between">
                <div className="text-xs text-main2">Tốt</div>
                <div>
                  <i className="pi pi-thumbs-up text-xs mr-2 opacity-60"></i>
                  <span className="text-xs opacity-60">Tốt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-column lg:flex-row gap-3">
        <Card title={<div className="text-lg">Báo cáo tổng quan huyết áp</div>}>
          <div
            className="max-w-full"
            style={{
              overflowX: "auto",
              width: `${tableWidthPx}px`,
            }}
          >
            <Chart
              type="line"
              data={chartData}
              options={{
                ...chartOptions,
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </div>
        </Card>
        <Card className="w-full lg:w-15rem">
          <div className="flex flex-column gap-2">
            <div className="card-4 flex flex-row align-items-center gap-2 p-2">
              <i className="pi pi-exclamation-circle font-bold"></i>
              <div className="flex flex-column gap-2">
                <div className="text-black">Huyết áp cao</div>
                <div className="text-black text-xs">
                  2 giờ trước - 145/95 mmHg
                </div>
              </div>
            </div>
            <div className="card-3 flex flex-row align-items-center gap-2 p-2">
              <i className="pi pi-heart font-bold"></i>
              <div className="flex flex-column gap-2">
                <div className="text-black">Nhịp tim giảm</div>
                <div className="text-black text-xs">30 phút trước - 72 BPM</div>
              </div>
            </div>
            <div className="card-1 flex flex-row align-items-center gap-2 p-2">
              <i className="pi pi-moon font-bold"></i>
              <div className="flex flex-column gap-2">
                <div className="text-black">Huyết áp cao</div>
                <div className="text-black text-xs">
                  1 giờ trước - Ngủ muộn hơn lần trước
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-column lg:flex-row gap-3">
          <div className="flex flex-column gap-3 card-5 p-3">
            <div className="flex flex-row justify-content-center text-main4">
              <Bed className="font-bold mr-3" />
              <div className="font-bold">Phân tích giấc ngủ</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Tổng thời lượng</div>
              <div className="text-black text-sm">7h 30p</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Thời gian đi ngủ</div>
              <div className="text-black text-sm">23:15</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">So sánh lần trước</div>
              <div className="text-black text-sm">Ngủ muộn hơn 45p</div>
            </div>
            <div
              className="flex flex-row align-items-center gap-3"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <Moon className=" text-main4 font-bold" />
              <div className="flex flex-column w-10 md:w-12">
                <div className="text-black text-sm">Ngủ quá muộn</div>
                <div className="text-xs opacity-60">
                  Cố gắng ngủ khoảng 22:00 giờ. Ngủ muộn không tốt cho hệ thống
                  miễn dịch và tăng tốc độ lão hóa.
                </div>
              </div>
            </div>
            <div
              className="flex flex-row align-items-center gap-3"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <Frown className="text-main4 font-bold" />
              <div className="flex flex-column w-10 md:w-12">
                <div className="text-black text-sm">Bạn chưa ngủ đủ</div>
                <div className="text-xs opacity-60">
                  Tốt nhất là ngủ 7-9 giờ mỗi ngày. Thiếu ngủ sẽ ảnh hưởng đến
                  sức khỏe và tinh thần.
                </div>
              </div>
            </div>
            <div
              className="shadow-1 w-12 border-round-xl"
              style={{
                padding: "0.3rem",
                borderLeft: "3px solid #2563eb",
                background: "#E8F4FD",
              }}
            >
              <div className="flex flex-row align-items-center gap-3 p-3">
                <Siren className="text-main4 font-bold" />
                <div className="flex flex-column w-10 md:w-12">
                  <div className="text-black  text-sm">
                    Ngủ muộn hoặc thiếu ngủ khiến cơ thể mệt mỏi, giảm tập trung
                    và đẩy nhanh quá trình lão hóa.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-column gap-3 card-5 p-3">
            <div className="flex flex-row justify-content-center text-main4">
              <HeartPulse className="pi pi-moon font-bold mr-3" />
              <div className="font-bold">Phân tích nhịp tim</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Hôm nay</div>
              <div className="text-black text-sm">72 BPM</div>
            </div>
            <div className="text-black text-sm">So sánh trong 7 ngày</div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Cao nhất</div>
              <div className="text-black text-sm">98 BPM</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Thấp nhất</div>
              <div className="text-black text-sm">65 BPM</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Trung bình</div>
              <div className="text-black text-sm">80 BPM</div>
            </div>
            <div className="text-main1 flex justify-content-end font-italic">
              Rất tốt
            </div>
            <div
              className="flex flex-row align-items-center gap-3"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <HandHeart className="pi pi-moon text-main4 font-bold" />
              <div className="flex flex-column w-10 md:w-12">
                <div className="text-black text-sm">Nhịp tim ổn định</div>
                <div className="text-xs opacity-60">
                  Nhịp tim hôm nay ổn định, ở mức bình thường và cho thất cơ thể
                  đang hoạt động khỏe mạnh.
                </div>
              </div>
            </div>

            <Slider
              value={72}
              min={30}
              max={300}
              className="slider-over"
              style={{
                background:
                  "linear-gradient(to right, #fdcb02ff,  #28c522ff,  #06b6d4,  #0062ffff, #0400ffff,  #ff0000ff )",
              }}
            />
            <div>72 BPM - Thư giãn</div>
          </div>
          <div className="flex flex-column gap-3 card-5 p-3">
            <div className="flex flex-row justify-content-center text-main4">
              <Droplets className="pi pi-moon font-bold mr-3" />
              <div className="font-bold">Phân tích đường huyết</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Hôm nay</div>
              <div className="text-black text-sm">90 mg/dL</div>
            </div>
            <div className="text-black text-sm">So sánh trong 7 ngày</div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Cao nhất</div>
              <div className="text-black text-sm">150 mg/dL</div>
            </div>
            <div
              className="flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <div className="opacity-80 text-sm">Thấp nhất</div>
              <div className="text-black text-sm">70 mg/dL</div>
            </div>
            <div
              className="flex flex-row align-items-center gap-3"
              style={{ borderBottom: "1px solid #acacacff" }}
            >
              <Stethoscope className="pi pi-moon text-main4 font-bold" />
              <div className="flex flex-column w-10 md:w-12">
                <div className="text-black text-sm">Đường huyết ổn định</div>
                <div className="text-xs opacity-60">
                  Đường huyết hôm nay ổn định, trong giới hạn an toàn; hãy tiếp
                  tục duy trì chế độ ăn uống và sinh hoạt lành mạnh.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-column lg:flex-row gap-3">
          <div className="w-full lg:w-4">
            <BMIGauge bmi={20.5} />
          </div>
          <div className="flex flex-column gap-3 w-full lg:w-8">
            <div className="p-3 bg-main3">
              <h2>BMI giúp đánh giá tình trạng cân nặng so với chiều cao.</h2>
              <div>
                Giá trị lý tưởng: 18.5 – 24.9. Duy trì BMI hợp lý giúp giảm nguy
                cơ bệnh tim mạch, tiểu đường và cao huyết áp.
              </div>
            </div>
            <div className="p-3 bg-main3">
              <h2>Thông tin</h2>
              <div className="fex gap-3">
                <div className="bg-white p-2">Chiều cao: 150 cm</div>
                <div className="bg-white p-2">Cân nặng: 50 kg</div>
                <div className="bg-white p-2">Nước cần uống: 1900 ml</div>
              </div>
            </div>
            <Button label="Tính lại BMI" />
          </div>
        </div>
      </Card>

      <Card title={<div className="text-lg">Nhận xét chính</div>}>
        <div className="flex flex-column gap-2">
          <div className="card-2 flex flex-row align-items-center gap-2 p-2">
            <TrendingUp />
            <div className="flex flex-column gap-2 w-10">
              <div className="text-black">Huyết áp cao</div>
              <div className="text-black text-xs">
                2 giờ trước - 145/95 mmHg
              </div>
            </div>
          </div>
          <div className="card-4 flex flex-row align-items-center gap-2 p-2">
            <ClipboardPenLine />
            <div className="flex flex-column gap-2 w-10">
              <div>Cải thiện tích cực</div>
              <div className="text-black text-xs">
                Nhịp tim trung bình và huyết áp trung bình ở mức ổn, cho thấy
                sức khỏe tim mach của bạn khá tốt, nên duy trì thoi quen lành
                mạnh mỗi ngày
              </div>
            </div>
          </div>
          <div className="card-1 flex flex-row align-items-center gap-2 p-2">
            <ThumbsUp />
            <div className="flex flex-column gap-2 w-10">
              <div>Khuyến nghị</div>
              <div className="text-black text-xs">
                Tiếp tục duy trì chế độ tập luyện hiện tại, cập nhật và theo dõi
                thường xuyên
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-column lg:flex-row gap-4">
          <div className="flex flex-row gap-3">
            <Avatar
              image={anh}
              shape="circle"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
            />
            <div className="w-10 flex flex-column gap-3">
              <div
                className="p-2 border-round-lg"
                style={{
                  background: "linear-gradient(to right, #fff9c4, #ffe082)",
                }}
              >
                <h3 className="font-bold mb-2">Chúc mừng bạn</h3>
                <p className="text-sm">
                  Bạn đã hoàn thành mục tiêu hôm nay. Sức khỏe của bạn đang ở
                  trạng thái tốt! Hãy tiếp tục duy trì phong độ này nhé
                </p>
              </div>
              <div
                className="p-2 border-round-lg"
                style={{
                  background: "linear-gradient(to right, #fff9c4, #ffe082)",
                }}
              >
                <h3 className="font-bold mb-2">Bạn có biết?</h3>
                <p className="text-sm">
                  Người dùng có cùng BMI 20.9 như bạn thường duy trì sức khỏe ổn
                  định nhất khi tập thể dục 3-4 buổi/tuần và ngủ đủ giấc. Hãy
                  tiếp tục phát huy nhé! 🌿
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-column gap-3">
            <div className="flex  gap-2 font-bold text-main1 text-xl">
              <Siren /> Gợi ý cho bạn
            </div>
            <div
              className="flex align-items-center gap-2 p-2 border-round-sm bg-main3"
              style={{
                border: "1px solid #b8b8b8ff",
              }}
            >
              <Utensils className="text-main4" />
              <span className="opacity-80 w-10">
                Xem gợi ý dinh dưỡng cho ngày mới
              </span>
            </div>
            <div
              className="flex align-items-center gap-2 p-2 border-round-sm bg-main3"
              style={{
                border: "1px solid #b8b8b8ff",
              }}
            >
              <MoonStar className="text-main4" />
              <span className="opacity-80 w-10">
                Đặt mục tiêu ngủ 7 tiếng mỗi đêm
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
