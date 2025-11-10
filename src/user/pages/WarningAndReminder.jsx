import React, { useEffect, useState, useRef } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";

const WarningAndReminder = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 992) tableWidthPx = width - 330;
  else tableWidthPx = width;

  const statusRef = useRef(null);

  const [selectedStatus, setSelectedStatus] = useState(1);
  const [formAddReminder, setFormAddReminder] = useState({
    title: 1,
    content: "",
    time: "",
    day: [],
  });
  const [visibleDialog, setVisibleDialog] = useState(false);

  const [errorAddReminder, setErrorAddReminder] = useState({
    title: false,
    content: false,
    time: false,
    day: false,
  });

  const status = [
    { name: "Tất cả", code: 1 },
    { name: "Đường huyết", code: 2 },
    { name: "Nhịp tim", code: 3 },
    { name: "Huyết áp", code: 4 },
    { name: "Giấc ngủ", code: 5 },
  ];

  const title = [
    { name: "Sinh hoạt hằng ngày", code: 1 },
    { name: "Sử dụng thuốc & điều trị", code: 2 },
    { name: "Theo dõi sức khỏe", code: 3 },
    { name: "Dinh dưỡng & lối sống", code: 4 },
    { name: "Sức khỏe tinh thần", code: 5 },
    { name: "Kiểm tra & báo cáo", code: 6 },
    { name: "Khám & theo dõi bệnh", code: 7 },
  ];

  const day = [
    { name: "Thứ 2", code: 1 },
    { name: "Thứ 3", code: 2 },
    { name: "Thứ 4", code: 3 },
    { name: "Thứ 5", code: 4 },
    { name: "Thứ 6", code: 5 },
    { name: "Thứ 7", code: 6 },
    { name: "Chủ nhật", code: 7 },
  ];

  useEffect(() => {
    const hideAll = () => {
      if (statusRef.current && statusRef.current.hide) {
        try {
          statusRef.current.hide();
        } catch (err) {
          console.warn("Error hiding Status Dropdown:", err);
        }
      }
    };

    // Lắng nghe scroll của toàn trang (window)
    window.addEventListener("scroll", hideAll);
    window.addEventListener("resize", hideAll);

    return () => {
      window.removeEventListener("scroll", hideAll);
      window.removeEventListener("resize", hideAll);
      hideAll();
    };
  }, []);

 
  const handleAddReminder = () => {
    setErrorAddReminder({
      title: !formAddReminder.title,
      content: !formAddReminder.content,
      time: !formAddReminder.time,
      day: !formAddReminder.day?.length,
    });

    if (Object.values(errorAddReminder).some((v) => v)) return;
  };

  return (
    <>
      <div className="flex flex-column">
        <div>
          <div className="font-bold text-2xl">Cảnh báo & nhắc nhở </div>
          <div className="text-main2 mb-3">
            Theo dõi cảnh báo sức khỏe và quản lý nhắc nhở cá nhân
          </div>
        </div>
        <div className="flex flex-column lg:flex-row gap-3">
          <div className="w-12 ">
            <Card
              style={{ width: width >= 768 ? "100%" : `${tableWidthPx}px` }}
            >
              <TabView>
                <TabPanel header="Cảnh báo tự động">
                  <div className="flex flex-column gap-5">
                    <Card>
                      <div className="flex flex-column gap-3 md:flex-row ">
                        <div className="flex align-items-center">
                          <i className="pi pi-filter text-2xl mr-3" />
                          <Dropdown
                            ref={statusRef}
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.value)}
                            options={status}
                            optionLabel="name"
                            optionValue="code"
                            placeholder="Trạng thái"
                            className="w-10rem"
                          />
                        </div>
                        <Button
                          className="lg:ml-auto w-10rem"
                          label="Xóa tất cả"
                          icon="pi pi-trash"
                          severity="danger"
                          outlined
                        />
                      </div>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel header="Nhắc nhở định kỳ">
                  <div className="flex flex-column gap-4">
                    <div className="flex justify-content-end">
                      <Button
                        label="Thêm nhắc nhở mới"
                        icon="pi pi-plus"
                        onClick={() => setVisibleDialog(true)}
                      />
                    </div>
                    <div className="max-h-ful">
                      <Card>
                        <div className="flex flex-row gap-3">
                          <i
                            className="pi pi-heart text-main1 p-3 text-2xl border-round-xl"
                            style={{ background: "#E7E7FF8F" }}
                          />
                          <div>
                            <div>
                              <span className="font-bold">
                                Sinh hoạt hằng ngày
                              </span>
                              <span className="opacity-80 ml-3">
                                - Uống 2 lit nước
                              </span>
                            </div>
                            <div>
                              <span className="opacity-80">
                                <i className="pi pi-calendar mr-3" />
                                Mỗi ngày
                              </span>
                              <span className="opacity-80 ml-3">
                                <i className="pi pi-stopwatch mr-3" />
                                10:00
                              </span>
                            </div>
                          </div>
                          <Button
                            className="ml-auto text-2xl"
                            icon="pi pi-trash"
                            severity="danger"
                            outlined
                            style={{ border: "none" }}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabPanel>
              </TabView>
            </Card>
          </div>
        </div>
      </div>
      <Dialog
        visible={visibleDialog}
        onHide={() => {
          if (!visibleDialog) return;
          setVisibleDialog(false);
        }}
        header={
          <h3 className="m-0 text-main1 text-center md:w-30rem">
            Thêm nhắc nhở mới
          </h3>
        }
      >
        <div className="flex flex-column gap-3">
          <div>
            <p className="mt-0 text-main1">Chủ đề</p>
            <Dropdown
              ref={statusRef}
              value={formAddReminder.title}
              onChange={(e) =>
                setFormAddReminder({
                  ...formAddReminder,
                  title: e.target.value,
                })
              }
              invalid={errorAddReminder.title}
              options={title}
              optionLabel="name"
              optionValue="code"
              placeholder="Vui lòng chọn chủ đề"
              className="w-full"
              onClick={() =>
                setErrorAddReminder({ ...errorAddReminder, title: false })
              }
            />
          </div>
          <div>
            <p className="mt-0 text-main1">Nội dung</p>
            <InputText
              value={formAddReminder.content}
              onChange={(e) =>
                setFormAddReminder({
                  ...formAddReminder,
                  content: e.target.value,
                })
              }
              invalid={errorAddReminder.content}
              className="w-full"
              placeholder="Nhập nội dung nhắc nhở"
              onClick={() =>
                setErrorAddReminder({ ...errorAddReminder, content: false })
              }
            />
          </div>
          <div>
            <p className="mt-0 text-main1">Thời gian nhắc nhở</p>
            <div className="flex flex-column md:flex-row gap-3">
              <Calendar
                value={formAddReminder.time}
                onChange={(e) =>
                  setFormAddReminder({
                    ...formAddReminder,
                    time: e.target.value,
                  })
                }
                invalid={errorAddReminder.time}
                className="w-full md:w-6"
                timeOnly
                readOnlyInput={true}
                placeholder="Nhập thời gian nhắc nhở"
                onClick={() =>
                  setErrorAddReminder({ ...errorAddReminder, time: false })
                }
              />
              <MultiSelect
                value={formAddReminder.day}
                onChange={(e) =>
                  setFormAddReminder({ ...formAddReminder, day: e.value })
                }
                invalid={errorAddReminder.day}
                options={day}
                optionLabel="name"
                className="w-full md:w-6"
                maxSelectedLabels={2}
                placeholder="Chọn ngày hẹn"
                selectAllLabel="Mỗi ngày"
              />
            </div>
          </div>
          <div className="flex flex-column justify-content-center gap-3 md:gap-5 md:flex-row">
            <Button
              label="Hủy"
              severity="secondary"
              onClick={() => {
                if (!visibleDialog) return;
                setVisibleDialog(false);
              }}
            />
            <Button label="Thêm" onClick={handleAddReminder} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WarningAndReminder;
