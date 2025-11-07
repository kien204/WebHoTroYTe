import React, { useEffect, useState, useRef } from "react";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabView } from "primereact/tabview";
import { TabPanel } from "primereact/tabview";
import { Chart } from "primereact/chart";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart as ChartJS } from "chart.js";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";

ChartJS.register(zoomPlugin);

const Reports = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 90;
  else if (width < 1440) tableWidthPx = width - 370;
  else tableWidthPx = width;

  let tableWidthPx1;
  if (width < 768) tableWidthPx1 = width - 90;
  else tableWidthPx1 = width - 400;

  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});
  const [chartData4, setChartData4] = useState({});

  const [chartOptions, setChartOptions] = useState({});

  const [dates, setDates] = useState(null);
  const opCalender = useRef(null);
  const [dataTable, setDataTable] = useState([
    {
      ngay: 20 / 10,
      data1: 120 / 80,
      data2: 72,
      data3: 96,
      data4: 7.5,
      note: "",
    },
    {
      ngay: 20 / 10,
      data1: 120 / 80,
      data2: 72,
      data3: 96,
      data4: 7.5,
      note: "",
    },
    {
      ngay: 20 / 10,
      data1: 120 / 80,
      data2: 72,
      data3: 96,
      data4: 7.5,
      note: "",
    },
    {
      ngay: 20 / 10,
      data1: 120 / 80,
      data2: 72,
      data3: 96,
      data4: 7.5,
      note: "sau an ds sa sad ad a sd sd ád ádad  kiển skienw  sa  sadsa ád á",
    },
  ]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const data1 = {
      labels: ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"],
      datasets: [
        {
          label: "Huyết áp tâm thu",
          data: [120, 122, 121, 124, 119, 118, 123],
          fill: false,
          borderColor: "#FF0000",
          tension: 0.4,
        },
        {
          label: "Huyết áp tâm trương",
          data: [78, 80, 77, 76, 79, 81, 78],
          fill: false,
          borderColor: "#FF0000",
          tension: 0.4,
        },
      ],
    };

    const data2 = {
      labels: ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"],
      datasets: [
        {
          label: "Huyết áp tâm thu",
          data: [90, 72, 91, 84, 109, 88, 93],
          fill: false,
          borderColor: "#227B00",
          tension: 0.4,
        },
      ],
    };

    const data3 = {
      labels: ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"],
      datasets: [
        {
          label: "Huyết áp tâm thu",
          data: [90, 72, 91, 84, 109, 88, 93],
          fill: false,
          borderColor: "#10004A",
          tension: 0.4,
        },
      ],
    };

    const data4 = {
      labels: ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"],
      datasets: [
        {
          label: "Huyết áp tâm thu",
          data: [7.8, 8, 9.3, 6, 4, 7.5, 8],
          fill: false,
          borderColor: "#0032A6",
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

    setChartData1(data1);
    setChartData2(data2);
    setChartData3(data3);
    setChartData4(data4);

    setChartOptions(options);
  }, []);

  useEffect(() => {
    const hideAll = () => {
      // OverlayPanel
      if (opCalender.current && opCalender.current.hide) {
        try {
          opCalender.current.hide();
        } catch (err) {
          console.warn("Error hiding OverlayPanel:", err);
        }
      }
    };

    //  window.addEventListener("scroll", hideAll);
    window.addEventListener("resize", hideAll);

    return () => {
      //  window.removeEventListener("scroll", hideAll);
      window.removeEventListener("resize", hideAll);
      hideAll();
    };
  }, []);
  return (
    <>
      <div className="flex gap-5 flex-column">
        <div>
          <div className="font-bold text-2xl">Báo cáo Sức khỏe</div>
          <div className="text-main2">Lưu trữ báo cáo để theo dõi... </div>
        </div>
        <div className="card-1 flex flex-column gap-3 p-3">
          <h4 className="m-0">Bộ lọc dữ liệu</h4>
          <div className="flex flex-column lg:flex-row gap-3">
            <div className="md:mr-auto">
              <label className="block mb-1 font-bold" htmlFor="age">
                Từ ngày
              </label>
              <div className="p-input-icon-left w-full">
                <i
                  className="pi pi-calendar z-1"
                  style={{ paddingLeft: "0.70rem" }}
                />
                <Calendar
                  ref={opCalender}
                  locale="vi"
                  id="age"
                  className="w-full"
                  inputClassName="pl-5"
                  placeholder="dd/mm/yyyy"
                  dateFormat="dd/mm/yy"
                  selectionMode="range"
                  readOnlyInput
                  hideOnRangeSelection
                  value={dates}
                  onChange={(e) => setDates(e.value)}
                  maxDate={new Date()} // không cho chọn ngày tương lai
                  //   minDate={
                  //     new Date(
                  //       new Date().setFullYear(new Date().getFullYear() - 120)
                  //     )
                  //   }
                />
              </div>
            </div>
            <div className="flex flex-column md:align-items-end md:flex-row gap-3">
              <Button className="" label="7 ngày gần nhất" />
              <Button label="30 ngày gần nhất" outline />
            </div>
          </div>
        </div>
        <div className="card-1 flex flex-column gap-3 p-3">
          <div className="flex flex-column md:flex-row">
            <h4 className="m-0">Dữ liệu chi tiết</h4>
            <Button
              label="Xuất file PDF"
              className="md:ml-auto w-auto"
              icon="pi pi-file-export"
              severity="success"
            />
          </div>
          <div
            className="flex"
            style={{
              overflowX: "auto",
              width: width >= 1440 ? "100%" : `${tableWidthPx}px`,
            }}
          >
            <DataTable
              className="w-full"
              value={dataTable} // Sử dụng danh sách đã lọc
              paginator
              rows={10}
              size="small"
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Hiển thị {first} đến {last} trong {totalRecords} người dùng"
              emptyMessage="Không có dữ liệu người dùng."
            >
              <Column field="ngay" header="Ngày" className="w-2" />
              <Column field="data1" header="Huyết áp" className="w-2" />
              <Column field="data2" header="Nhịp tim" className="w-2" />
              {/* <Column
                field="creatAt"
                header="Ngày tạo"
                body={(rowData) =>
                  new Date(rowData.creatAt).toLocaleDateString("vi-VN")
                }
              /> */}
              <Column field="data3" header="Đường huyết" className="w-2" />
              <Column field="data4" header="Giấc ngủ" className="w-2" />
              <Column
                header="Ghi chú"
                body={(rowData) => (
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal", // để xuống dòng
                    }}
                  >
                    {rowData.note ? rowData.note : "------"}
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
        <div
          className="border-round-xl shadow-4 p-3"
          style={{
            background: "linear-gradient(to right, #22a0f6, #68bbf2ff)",
          }}
        >
          <h3 className="mt-0 text-white">
            <i className="pi pi-book font-bold mr-3" />
            Tóm tắt tình trạng sức khỏe
          </h3>
          <div className="text-white opacity-80">
            Trong 7 ngày qua, các chỉ số sức khỏe của bạn nhìn chung đang ổn
            định. Huyết áp trung bình 120/80 mmHg, nhịp tim 72 BPM, đường huyết
            95 mg/dL và giấc ngủ trung bình 7.6 giờ/đêm. Tiếp tục duy trì lối
            sống lành mạnh và theo dõi thường xuyên.
          </div>
        </div>
        <div
          className="card-1 flex flex-column gap-3 p-3"
          style={{ color: "black" }}
        >
          <h4 className="m-0">Biểu đồ xu hướng</h4>
          <div style={{ width: width >= 1440 ? "100%" : `${tableWidthPx}px` }}>
            <TabView>
              <TabPanel header="Huyết áp">
                <div className="flex flex-column gap-6">
                  <div
                    className="flex flex-row align-items-center gap-3 border-round-lg p-3"
                    style={{ background: "#FFDEDE" }}
                  >
                    <i className="pi pi-chart-line text-2xl" />
                    <div>
                      <h4 className="m-0">Huyết áp</h4>
                      <div>Ngưỡng cho phép: 100/70 mmHg - 140/90 mmHg</div>
                    </div>
                  </div>
                  <div
                    className="max-w-full"
                    style={{
                      overflowX: "auto",
                      width: `${tableWidthPx1}px`,
                    }}
                  >
                    <Chart
                      type="line"
                      data={chartData1}
                      options={{
                        ...chartOptions,
                        maintainAspectRatio: false,
                        responsive: true,
                      }}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Nhịp tim">
                <div className="flex flex-column gap-6">
                  <div
                    className="flex flex-row align-items-center gap-3 border-round-lg p-3"
                    style={{ background: "#E7FFDE" }}
                  >
                    <i className="pi pi-heart text-2xl" />
                    <div>
                      <h4 className="m-0">Nhịp tim</h4>
                      <div>Ngưỡng cho phép: 60 BPM - 100 BPM</div>
                    </div>
                  </div>
                  <div
                    className="max-w-full"
                    style={{
                      overflowX: "auto",
                      width: `${tableWidthPx1}px`,
                    }}
                  >
                    <Chart
                      type="line"
                      data={chartData2}
                      options={{
                        ...chartOptions,
                        maintainAspectRatio: false,
                        responsive: true,
                      }}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Đường huyết">
                <div className="flex flex-column gap-6">
                  <div
                    className="flex flex-row align-items-center gap-3 border-round-lg p-3"
                    style={{ background: "#E5DEFF" }}
                  >
                    <i className="pi pi-wave-pulse text-2xl" />
                    <div>
                      <h4 className="m-0">Đường huyết</h4>
                      <div>Ngưỡng cho phép: 70 mg/dL - 140 mg/dL</div>
                    </div>
                  </div>
                  <div
                    className="max-w-full"
                    style={{
                      overflowX: "auto",
                      width: `${tableWidthPx1}px`,
                    }}
                  >
                    <Chart
                      type="line"
                      data={chartData3}
                      options={{
                        ...chartOptions,
                        maintainAspectRatio: false,
                        responsive: true,
                      }}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Giấc ngủ">
                <div className="flex flex-column gap-6">
                  <div
                    className="flex flex-row align-items-center gap-3 border-round-lg p-3"
                    style={{ background: "#CDDCFF" }}
                  >
                    <i className="pi pi-moon text-2xl" />
                    <div>
                      <h4 className="m-0">Giấc ngủ</h4>
                      <div>Ngưỡng cho phép: 6h - 9h</div>
                    </div>
                  </div>
                  <div
                    className="max-w-full"
                    style={{
                      overflowX: "auto",
                      width: `${tableWidthPx1}px`,
                    }}
                  >
                    <Chart
                      type="line"
                      data={chartData4}
                      options={{
                        ...chartOptions,
                        maintainAspectRatio: false,
                        responsive: true,
                      }}
                    />
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
        <div
          className="card-1 flex flex-column gap-3 p-3"
          style={{ color: "black" }}
        >
          <h4 className="m-0">Báo cáo đã lưu</h4>
          <div className="flex flex-column lg:flex-row gap-3 border-round-sm p-3 bg-white">
            <div className="flex flex-row align-items-center gap-3">
              <i className="pi pi-bookmark font-bold text-2xl text-main1" />
              <div className="flex flex-column">
                <h4 className="m-0">Báo cáo theo thời gian của tháng 9</h4>
                <div className="text-sm opacity-80">15/09 - 30/09</div>
                <div className="text-sm">
                  Báo cáo chi tiết của tháng 09 đã được gửi qua email của bạn!
                </div>
              </div>
            </div>
            <div className="flex flex-column md:flex-row gap-3 lg:ml-auto">
              <Button
                icon="pi pi-file-export"
                label="Xuất PDF"
                severity="success"
                size="small"
              />
              <Button
                icon="pi pi-share-alt"
                label="Chia sẻ"
                severity="info"
                size="small"
              />
              <Button
                icon="pi pi-trash"
                label="Xóa"
                severity="danger"
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
