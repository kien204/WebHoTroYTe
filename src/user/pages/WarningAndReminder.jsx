import React, { useEffect, useState, useRef } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";

const WarningAndReminder = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 992) tableWidthPx = width - 330;
  else tableWidthPx = width;

  const statusRef = useRef(null);

  const [selectedStatus, setSelectedStatus] = useState(1);

  const status = [
    { name: "Tất cả", code: 1 },
    { name: "Đường huyết", code: 2 },
    { name: "Nhịp tim", code: 3 },
    { name: "Huyết áp", code: 4 },
    { name: "Giấc ngủ", code: 5 },
  ];

  useEffect(() => {
    // Dropdown trạng thái
    const hideAll = () => {
      // Dropdown trạng thái
      if (statusRef.current && statusRef.current.hide) {
        try {
          statusRef.current.hide();
        } catch (err) {
          console.warn("Error hiding Status Dropdown:", err);
        }
      }
    };

    window.addEventListener("scroll", hideAll, true);
    window.addEventListener("resize", hideAll);

    return () => {
      window.removeEventListener("scroll", hideAll, true);
      window.removeEventListener("resize", hideAll);
      hideAll();
    };
  }, []);

  return (
    <div className="flex flex-column">
      <div>
        <div className="font-bold text-2xl">Cảnh báo & nhắc nhở </div>
        <div className="text-main2 mb-3">
          Theo dõi cảnh báo sức khỏe và quản lý nhắc nhở cá nhân
        </div>
      </div>
      <div className="flex flex-column lg:flex-row gap-3">
        <div className="w-12 ">
          <Card style={{ width: width >= 768 ? "100%" : `${tableWidthPx}px` }}>
            <TabView>
              <TabPanel header="Cảnh báo tự động">
                <div className="flex flex-column gap-5">
                  <Card>
                    <div className="flex flex-column gap-3 lg:flex-row ">
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
                    <Button label="Thêm nhắc nhở mới" icon="pi pi-plus" />
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
  );
};

export default WarningAndReminder;
