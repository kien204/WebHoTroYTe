import React, { useEffect, useState, useRef, useContext } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { Calendar } from "primereact/calendar";

import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";
import { AuthContext } from "../../common/context/AuthContext";
import remindAPI from "../../services/api/remindAPI";

const WarningAndReminder = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 992) tableWidthPx = width - 350;
  else tableWidthPx = width;

  const { showToast } = useToast();
  const { auth, profile } = useContext(AuthContext);
  const { callApi } = useApi(showToast);

  const [data, setData] = useState(null);
  const statusRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [formAddReminder, setFormAddReminder] = useState({
    title: "",
    content: "",
    time: "",
  });
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [dataAutoWarning, setDataAutoWarning] = useState(null);

  const [errorAddReminder, setErrorAddReminder] = useState({
    title: false,
    content: false,
    time: false,
  });

  const status = [
    { name: "Tất cả", code: 1 },
    { name: "Đường huyết", code: 2 },
    { name: "Nhịp tim", code: 3 },
    { name: "Huyết áp", code: 4 },
    { name: "Giấc ngủ", code: 5 },
  ];

  const title = [
    { name: "Sinh hoạt hằng ngày", code: "Sinh hoạt hằng ngày" },
    { name: "Sử dụng thuốc & điều trị", code: "Sử dụng thuốc & điều trị" },
    { name: "Theo dõi sức khỏe", code: "Theo dõi sức khỏe" },
    { name: "Dinh dưỡng & lối sống", code: "Dinh dưỡng & nối sống" },
    { name: "Sức khỏe tinh thần", code: "Sức khỏe tinh thần" },
    { name: "Kiểm tra & báo cáo", code: "Kiểm tra & báo cáo" },
    { name: "Khám & theo dõi bệnh", code: "Khám & theo dõi bệnh" },
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
  const getData = async () => {
    try {
      const res = await callApi(() => remindAPI.get(auth.id));
      setData(res.water);
    } catch {
      //
    }
  };

  const getDataAuto = async () => {
    try {
      let type = null;

      switch (selectedStatus) {
        case 2:
          type = "BloodSugar";
          break;
        case 3:
          type = "HeartRate";
          break;
        case 4:
          type = "BloodPressure";
          break;
        case 5:
          type = "Sleep";
          break;
        default:
          type = null;
          break;
      }

      const result = await callApi(() =>
        remindAPI.getWarning(profile.hoSoId, type)
      );

      setDataAutoWarning(result || null);
      // hoặc: setDataAutoWarning(result || []);
    } catch {
      setDataAutoWarning(null);
      // hoặc: setDataAutoWarning([]);
    }
  };

  useEffect(() => {
    if (!profile?.hoSoId) return;

    getDataAuto();
  }, [profile?.hoSoId, selectedStatus]);

  const toDecimalHour = (time) => {
    if (!time) return null;
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return h + m / 60 + s / 3600;
  };

  const handleAddReminder = async () => {
    setErrorAddReminder({
      title: !formAddReminder.title,
      content:
        !formAddReminder.content ||
        formAddReminder.content.length < 2 ||
        formAddReminder.content.length > 255,
      time: !formAddReminder.time,
    });

    if (
      !formAddReminder.title ||
      !formAddReminder.content ||
      formAddReminder.content.length < 2 ||
      formAddReminder.content.length > 255 ||
      !formAddReminder.time
    )
      return;

    const decimal = toDecimalHour(formAddReminder.time);
    try {
      await callApi(() =>
        remindAPI.create({
          tkId: auth?.id,
          timeRemind: decimal,
          title: formAddReminder.title,
          content: formAddReminder.content,
        })
      );

      showToast("success", "Thành công", "Thêm nhắc nhở mới thành công");
      setFormAddReminder({
        title: "",
        content: "",
        time: "",
      });
      setVisibleDialog(false);
      getData();
    } catch {
      //
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await callApi(() => remindAPI.delete(id));
      showToast("success", "Thành công", "Xóa nhắc nhở thành công");
      getData();
    } catch {
      //
    }
  };

  const handleDeleteWarning = async () => {
    if (!profile?.hoSoId) return;

    try {
      await callApi(() => remindAPI.deleteWarning(profile?.hoSoId));
      showToast("success", "Thành công", "Xóa tất cả thành công");
      getDataAuto();
    } catch {
      //
    }
  };

  const handleDeleteItemWarning = async (id) => {
    if (!id) return;
    try {
      await callApi(() => remindAPI.deleteItemWarning(id));
      showToast("success", "Thành công", "Xóa cảnh báo thành công!");
      getDataAuto();
    } catch {
      //
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (e) => {
    setActiveIndex(e.index);
    if (e.index === 0) {
      if (!profile?.hoSoId) return;
      getDataAuto();
    } else if (e.index === 1) {
      console.log(auth.id);
      
      if (!auth?.id) return;
      getData();
    }
  };

  return (
    <>
      <div className="flex flex-column warningandreminder">
        <div>
          <div className="font-bold text-2xl">Cảnh báo & nhắc nhở </div>
          <div className="text-main2 mb-3">
            Theo dõi cảnh báo sức khỏe và quản lý nhắc nhở cá nhân
          </div>
        </div>
        <div className="flex flex-column lg:flex-row gap-3">
          <div className="w-12">
            <Card
              style={{ width: width >= 992 ? "100%" : `${tableWidthPx}px` }}
            >
              <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel contentClassName="mt-4" header="Cảnh báo tự động">
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
                        {dataAutoWarning?.length > 0 && (
                          <Button
                            className="lg:ml-auto w-10rem"
                            label="Xóa tất cả"
                            icon="pi pi-trash"
                            severity="danger"
                            outlined
                            onClick={handleDeleteWarning}
                          />
                        )}
                      </div>
                    </Card>
                    <div className="flex flex-column gap-3">
                      {dataAutoWarning?.map((item) => (
                        <div key={item.id} className="flex flex-column gap-3">
                          <div
                            className={`flex flex-row gap-3 p-3 align-items-center ${
                              item.point === "BloodPressure"
                                ? "card-1"
                                : item.point === "BloodSugar"
                                ? "card-2"
                                : item.point === "Sleep"
                                ? "card-3"
                                : "card-4"
                            }`}
                          >
                            <i
                              className={`pi ${item.icon} font-bold p-3 text-2xl border-round-xl`}
                            />
                            <div className="flex flex-column gap-2 text-black">
                              <div>
                                <span className="font-bold">
                                  {item.point === "BloodPressure"
                                    ? "Huyết áp"
                                    : item.point === "BloodSugar"
                                    ? "Đường huyết"
                                    : item.point === "Sleep"
                                    ? "Giấc ngủ"
                                    : "Nhịp tim"}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.mess}
                              </div>
                              <div className="opacity-70">
                                <i className="pi pi-calendar mr-3" />
                                {item.node}
                              </div>
                            </div>
                            <Button
                              className="ml-auto text-2xl"
                              icon="pi pi-trash"
                              severity="danger"
                              outlined
                              style={{ border: "none" }}
                              onClick={() => handleDeleteItemWarning(item.id)} // xóa theo id
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel contentClassName="mt-4" header="Nhắc nhở định kỳ">
                  <div className="flex flex-column gap-4">
                    <div className="flex justify-content-end">
                      <Button
                        label="Thêm nhắc nhở mới"
                        icon="pi pi-plus"
                        onClick={() => setVisibleDialog(true)}
                      />
                    </div>
                    <div className="max-h-full flex flex-column gap-3">
                      {data?.map((item) => (
                        <Card key={item.id}>
                          <div className="flex flex-row gap-3 align-items-center">
                            <i
                              className="pi pi-heart text-main1 p-3 text-2xl border-round-xl"
                              style={{ background: "#E7E7FF8F" }}
                            />
                            <div className="flex flex-column">
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                <span className="font-bold">{item.title}</span>
                                <span className="opacity-80 ml-3">
                                  - {item.content}
                                </span>
                              </div>
                              <div>
                                <span className="opacity-80">
                                  <i className="pi pi-calendar mr-3" />
                                  Mỗi ngày
                                </span>
                                <span className="opacity-80 ml-3">
                                  <i className="pi pi-stopwatch mr-3" />
                                  {item.timeVert}
                                </span>
                              </div>
                            </div>
                            <Button
                              className="ml-auto text-2xl"
                              icon="pi pi-trash"
                              severity="danger"
                              outlined
                              style={{ border: "none" }}
                              onClick={() => handleDelete(item.id)} // xóa theo id
                            />
                          </div>
                        </Card>
                      ))}
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
          {formAddReminder.content && errorAddReminder.content && (
            <small className="p-error">Nội dung phải từ 2 đến 255 ký tự</small>
          )}
          <div>
            <p className="mt-0 text-main1">Thời gian nhắc nhở</p>
            <div className="relative w-full">
              <Calendar
                value={formAddReminder.time}
                onChange={(e) =>
                  setFormAddReminder({
                    ...formAddReminder,
                    time: e.target.value,
                  })
                }
                invalid={errorAddReminder.time}
                className="w-full"
                inputClassName="pr-8"
                timeOnly
                readOnlyInput
                placeholder="Nhập thời gian nhắc nhở"
                onClick={() =>
                  setErrorAddReminder({ ...errorAddReminder, time: false })
                }
              />
              <span
                className="absolute text-main1 text-sm"
                style={{
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                Mỗi ngày
              </span>
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
