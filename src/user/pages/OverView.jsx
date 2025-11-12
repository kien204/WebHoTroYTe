import React, { useState, useEffect, useContext } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart as ChartJS } from "chart.js";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { Link } from "react-router-dom";

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
import { AuthContext } from "../../common/context/AuthContext";
import overViewAPI from "../../services/api/overViewAPI";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";

ChartJS.register(zoomPlugin);

const OverView = () => {
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);
  const { profile } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [dataBMI, setDataBMI] = useState({
    height: "",
    weight: "",
  });
  const [errorForm, setErrorForm] = useState({
    weight: false,
    height: false,
  });
  const [ketqua, setKetQUa] = useState("");
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});

  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 90;
  else if (width < 1024) tableWidthPx = width - 370;
  else tableWidthPx = width - 620;

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (profile) {
      const { height, weight } = profile;
      setDataBMI({ height, weight });
      const heightInMeters = height / 100;
      setKetQUa(weight / (heightInMeters * heightInMeters));
    }
  }, [profile]);

  const getDatas1 = async () => {
    try {
      const res1 = await callApi(
        () => overViewAPI.getdata1(profile.hoSoId),
        false,
        false
      );

      setData1(res1);
    } catch {
      //
    }
  };

  const getDatas4 = async () => {
    try {
      const res4 = await callApi(
        () => overViewAPI.getdata4(profile.hoSoId),
        false,
        false
      );

      setData4(res4);
    } catch {
      //
    }
  };

  const getDatas3 = async () => {
    try {
      const res3 = await callApi(
        () => overViewAPI.getdata3(profile.hoSoId),
        false,
        false
      );

      setData3(res3);
    } catch {
      //
    }
  };

  const getDatas2 = async () => {
    try {
      const res2 = await callApi(
        () => overViewAPI.getdata2(profile.hoSoId),
        false,
        false
      );

      setData2(res2);

      // ✅ cập nhật chart sau khi có data2
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      setChartData({
        labels: res2?.labels ?? [],
        datasets: [
          {
            label: "Huyết áp tâm thu",
            data: res2?.datasets?.[0]?.data ?? [],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
          },
          {
            label: "Huyết áp tâm trương",
            data: res2?.datasets?.[1]?.data ?? [],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--pink-500"),
            tension: 0.4,
          },
        ],
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor },
          },
          zoom: {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: "x",
            },
            pan: {
              enabled: true,
              mode: "x",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: textColorSecondary },
            grid: { color: surfaceBorder },
          },
          y: {
            ticks: { color: textColorSecondary },
            grid: { color: surfaceBorder },
          },
        },
      });
    } catch {
      //
    }
  };

  useEffect(() => {

    if (Object.keys(profile).length === 0 || profile?.hoSoId)
      return;
    console.log("sao van lay");

    getDatas1();
    getDatas2();
    getDatas3();
    getDatas4();
  }, [profile, profile?.hoSoId]);

  const handleBMI = () => {
    const newErrors = {
      height:
        !dataBMI.height ||
        dataBMI.height <= 0 ||
        dataBMI.height >= 300 ||
        !/^-?\d+$/.test(dataBMI.height) ||
        isNaN(dataBMI.height),
      weight:
        !dataBMI.weight ||
        dataBMI.weight <= 0 ||
        dataBMI.weight >= 500 ||
        !/^-?\d+$/.test(dataBMI.weight) ||
        isNaN(dataBMI.weight),
    };

    setErrorForm(newErrors);

    if (Object.values(newErrors).some((v) => v)) return;

    const heightInMeters = dataBMI.height / 100;
    setKetQUa(dataBMI.weight / (heightInMeters * heightInMeters));
    setVisible(false);
  };

  return (
    <>
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
                <div className="mt-3">
                  <div className="mt-3">
                    {data1?.bloodPressure?.record?.systolic ?? "--"}/
                    {data1?.bloodPressure?.record?.diastolic ?? "--"}
                  </div>
                </div>
                <div className="w-full flex justify-content-between">
                  <div className="text-xs text-main2">
                    mmHg -{" "}
                    {data1?.bloodPressure?.record?.bloodPressureAlert ?? "--"}
                  </div>
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
                <div className="mt-3">
                  {data1?.bloodSugar?.record?.bloodSugar ?? "--"}
                </div>
                <div className="w-full flex justify-content-between">
                  <div className="text-xs text-main2">
                    BPM - {data1?.bloodSugar?.record?.bloodSugarAlert ?? "--"}
                  </div>
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
                <div className="mt-3">
                  {data1?.heartRate?.record?.heartRate ?? "--"} mg/dL
                </div>
                <div className="w-full flex justify-content-between">
                  <div className="text-xs text-main2">
                    {data1?.heartRate?.record?.heartRateAlert ?? "--"}
                  </div>
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
                <div className="mt-3">
                  {data1?.sleep?.record?.hoursSleep ?? "--"} giờ
                </div>
                <div className="w-full flex justify-content-between">
                  <div className="text-xs text-main2">
                    {data1?.sleep?.record?.sleepAlert ?? "--"}
                  </div>
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
          <Card
            title={<div className="text-lg">Báo cáo tổng quan huyết áp</div>}
          >
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
                  <div className="text-black">
                    {data3?.bloodSugarSummary?.current?.alert ?? "--"}
                  </div>
                  <div className="text-black text-xs">
                    {data3?.bloodSugarSummary?.current?.recordedAt ?? "--"}
                    {" - "}
                    {data3?.bloodSugarSummary?.current?.value ?? "--"} mg/dL
                  </div>
                </div>
              </div>
              <div className="card-3 flex flex-row align-items-center gap-2 p-2">
                <i className="pi pi-heart font-bold"></i>
                <div className="flex flex-column gap-2">
                  <div className="text-black">
                    {data3?.heartRateSummary?.current?.alert ?? "--"}
                  </div>
                  <div className="text-black text-xs">
                    {data3?.heartRateSummary?.current?.recordedAt ?? "--"} -{" "}
                    {data3?.heartRateSummary?.current?.value ?? "--"} BPM
                  </div>
                </div>
              </div>
              <div className="card-1 flex flex-row align-items-center gap-2 p-2">
                <i className="pi pi-moon font-bold"></i>
                <div className="flex flex-column gap-2">
                  <div className="text-black">
                    {data3?.sleepComparison?.compare ?? "--"}
                  </div>
                  <div className="text-black text-xs">
                    {data3?.sleepComparison?.sleepTime ?? "--"} -{" "}
                    {data3?.sleepComparison?.compare ?? "--"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-column lg:flex-row gap-3">
            <div className="flex flex-column lg:w-4 gap-3 card-5 p-3 shadow-1">
              <div className="flex flex-row justify-content-center text-main4">
                <Bed className="font-bold mr-3" />
                <div className="font-bold">Phân tích giấc ngủ</div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Tổng thời lượng</div>
                <div className="text-black text-sm">
                  {data3?.sleepComparison?.time ?? "--"}
                </div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Thời gian đi ngủ</div>
                <div className="text-black text-sm">
                  {data3?.sleepComparison?.sleepTime ?? "--"}
                </div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">So sánh lần trước</div>
                <div className="text-black text-sm">
                  {data3?.sleepComparison?.compare ?? "--"}
                </div>
              </div>
              <div
                className="flex flex-row align-items-center gap-3"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <Moon className=" text-main4 font-bold" />
                <div className="flex flex-column w-10 md:w-12">
                  <div className="text-black text-sm">Ngủ quá muộn</div>
                  <div className="text-xs opacity-60">
                    Cố gắng ngủ khoảng 22:00 giờ. Ngủ muộn không tốt cho hệ
                    thống miễn dịch và tăng tốc độ lão hóa.
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
                      Ngủ muộn hoặc thiếu ngủ khiến cơ thể mệt mỏi, giảm tập
                      trung và đẩy nhanh quá trình lão hóa.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-column gap-3 lg:w-4 card-5 p-3 shadow-1">
              <div className="flex flex-row justify-content-center text-main4">
                <HeartPulse className="pi pi-moon font-bold mr-3" />
                <div className="font-bold">Phân tích nhịp tim</div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Hôm nay</div>
                <div className="text-black text-sm">
                  {data3?.heartRateSummary?.current?.value ?? "--"} BPM
                </div>
              </div>
              <div className="text-black text-sm">So sánh trong 7 ngày</div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Cao nhất</div>
                <div className="text-black text-sm">
                  {data3?.heartRateSummary?.max ?? "--"} BPM
                </div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Thấp nhất</div>
                <div className="text-black text-sm">
                  {data3?.heartRateSummary?.min ?? "--"} BPM
                </div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Trung bình</div>
                <div className="text-black text-sm">
                  {data3?.heartRateSummary?.average ?? "--"} BPM
                </div>
              </div>
              <div className="text-main1 flex justify-content-end font-italic">
                {data3?.heartRateSummary?.averageAlert ?? "--"}
              </div>
              <div
                className="flex flex-row align-items-center gap-3"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <HandHeart className="pi pi-moon text-main4 font-bold" />
                <div className="flex flex-column w-10 md:w-12">
                  <div className="text-black text-sm">
                    {data3?.heartRateSummary?.averageAlert ?? "--"}
                  </div>
                  <div className="text-xs opacity-60">
                    {data3?.heartRateSummary?.evaluation ?? "--"}
                  </div>
                </div>
              </div>

              <Slider
                value={data3?.heartRateSummary?.current?.value ?? 72}
                min={30}
                max={300}
                className="slider-over"
                style={{
                  background:
                    "linear-gradient(to right, #fdcb02ff,  #28c522ff,  #06b6d4,  #0062ffff, #0400ffff,  #ff0000ff )",
                }}
              />
              <div>
                {data3?.heartRateSummary?.current?.value ?? "--"} BPM - Thư giãn
              </div>
            </div>
            <div className="flex flex-column gap-3 card-5 lg:w-4 p-3 shadow-1">
              <div className="flex flex-row justify-content-center text-main4">
                <Droplets className="pi pi-moon font-bold mr-3" />
                <div className="font-bold">Phân tích đường huyết</div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Hôm nay</div>
                <div className="text-black text-sm">
                  {data3?.bloodSugarSummary?.current?.value ?? "--"} BPM mg/dL
                </div>
              </div>
              <div className="text-black text-sm">So sánh trong 7 ngày</div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Cao nhất</div>
                <div className="text-black text-sm">
                  {data3?.bloodSugarSummary?.max ?? "--"} mg/dL
                </div>
              </div>
              <div
                className="flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <div className="opacity-80 text-sm">Thấp nhất</div>
                <div className="text-black text-sm">
                  {data3?.bloodSugarSummary?.min ?? "--"} mg/dL
                </div>
              </div>
              <div
                className="flex flex-row align-items-center gap-3"
                style={{ borderBottom: "1px solid #acacacff" }}
              >
                <Stethoscope className="pi pi-moon text-main4 font-bold" />
                <div className="flex flex-column w-10 md:w-12">
                  <div className="text-black text-sm">
                    {data3?.bloodSugarSummary?.averageAlert ?? "--"}
                  </div>
                  <div className="text-xs opacity-60">
                    {data3?.bloodSugarSummary?.evaluation ?? "--"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <h3>Cân nặng lý tưởng </h3>
          </div>
          <div className="flex flex-column lg:flex-row gap-3">
            <div className="w-full lg:w-4">
              <BMIGauge bmi={ketqua || 0} />
            </div>
            <div className="flex flex-column gap-3 w-full lg:w-8">
              <div className="p-3 bg-main3">
                <h2>BMI giúp đánh giá tình trạng cân nặng so với chiều cao.</h2>
                <div>
                  Giá trị lý tưởng: 18.5 – 24.9. Duy trì BMI hợp lý giúp giảm
                  nguy cơ bệnh tim mạch, tiểu đường và cao huyết áp.
                </div>
              </div>
              <div className="p-3 bg-main3">
                <h2>Thông tin</h2>
                <div className="fex gap-3">
                  <div className="bg-white p-2">
                    Chiều cao: {dataBMI.height} cm
                  </div>
                  <div className="bg-white p-2">
                    Cân nặng: {dataBMI.weight} kg
                  </div>
                  <div className="bg-white p-2">Nước cần uống: 1900 ml</div>
                </div>
              </div>
              <Button label="Tính lại BMI" onClick={() => setVisible(true)} />
            </div>
          </div>
        </Card>

        <Card title={<div className="text-lg">Nhận xét chính</div>}>
          <div className="flex flex-column gap-2">
            <div className="card-2 flex flex-row align-items-center gap-2 p-2">
              <TrendingUp />
              <div className="flex flex-column gap-2 w-10">
                <div className="text-black">{data4?.positive?.[0] ?? "--"}</div>
                <div className="text-black">{data4?.positive?.[1] ?? "--"}</div>
              </div>
            </div>
            <div className="card-4 flex flex-row align-items-center gap-2 p-2">
              <ClipboardPenLine />
              <div className="flex flex-column gap-2 w-10">
                <div className="text-black">{data4?.warn?.[0] ?? "--"}</div>
                <div className="text-black">{data4?.warn?.[1] ?? "--"}</div>
              </div>
            </div>
            <div className="card-1 flex flex-row align-items-center gap-2 p-2">
              <ThumbsUp />
              <div className="flex flex-column gap-2 w-10">
                <div>Khuyến nghị</div>
                <div className="text-black text-xs">
                  Tiếp tục duy trì chế độ tập luyện hiện tại, cập nhật và theo
                  dõi thường xuyên
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
                    Người dùng có cùng BMI 20.9 như bạn thường duy trì sức khỏe
                    ổn định nhất khi tập thể dục 3-4 buổi/tuần và ngủ đủ giấc.
                    Hãy tiếp tục phát huy nhé! 🌿
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-column gap-3">
              <div className="flex  gap-2 font-bold text-main1 text-xl">
                <Siren /> Gợi ý cho bạn
              </div>
              <Link
                to="https://nhathuoclongchau.com.vn/bai-viet/goi-y-thuc-don-bua-sang-cho-7-ngay-day-du-dinh-duong-va-tien-loi.html"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
              <Link
                to="https://tamanhhospital.vn/cach-ngu-sau-giac/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <Dialog
        visible={visible}
        header={<div className="text-center">Tính toán nhanh BMI</div>}
      >
        <label className="block mb-1 font-bold" htmlFor="weight">
          Cân nặng
        </label>
        <div className="flex align-items-center relative">
          <InputIcon
            className="pi pi-shopping-bag absolute"
            style={{ marginLeft: "0.75rem" }}
          />
          <InputText
            id="weight"
            value={dataBMI.weight || ""}
            onChange={(e) => setDataBMI({ ...dataBMI, weight: e.target.value })}
            placeholder="Nhập cân nặng"
            invalid={errorForm.weight}
            onFocus={() => setErrorForm({ ...errorForm, weight: false })}
            className="pl-5 w-12"
          />
          {dataBMI.weight && errorForm.weight && (
            <small className="p-error">
              {dataBMI.weight <= 0 || dataBMI.weight >= 500
                ? "Dữ liệu phải làm trong khoảng 0-500 kg"
                : "Cân nặng không hợp lệ! Vui lòng nhập lại!"}
            </small>
          )}
        </div>
        <label className="block mb-1 font-bold mt-3" htmlFor="height">
          Chiều cao
        </label>
        <div className="flex align-items-center relative">
          <InputIcon
            className="pi pi-arrows-v absolute"
            style={{ marginLeft: "0.75rem" }}
          />
          <InputText
            id="height"
            value={dataBMI.height || ""}
            onChange={(e) => setDataBMI({ ...dataBMI, height: e.target.value })}
            onFocus={() => setErrorForm({ ...errorForm, height: false })}
            placeholder="Nhập chiều cao"
            invalid={errorForm.height}
            className="pl-5 w-12"
          />
          {dataBMI.height && errorForm.height && (
            <small className="p-error">
              {dataBMI.height <= 0 || dataBMI.height >= 300
                ? "Dữ liệu phải làm trong khoảng 0-300 cm"
                : "Chiều cao không hợp lệ! Vui lòng nhập lại!"}
            </small>
          )}
        </div>
        <div className="flex flex-row justify-content-center gap-3 mt-3">
          <Button label="Hủy" onClick={() => setVisible(false)} />
          <Button label="Tính toán" onClick={handleBMI} />
        </div>
      </Dialog>
    </>
  );
};

export default OverView;
