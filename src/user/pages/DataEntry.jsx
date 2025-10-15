import React, { useState } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const DataEntry = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 1440) tableWidthPx = width - 310;
  else tableWidthPx = width;

  const [form1, setForm1] = useState({
    data1: null,
    data2: null,
    data3: "",
  });
  const [form2, setForm2] = useState({
    data1: null,
    data2: "",
  });
  const [form3, setForm3] = useState({
    data1: null,
    data2: "",
  });
  const [form4, setForm4] = useState({
    data1: null,
    data2: "",
  });

  const [errorform1, seterrorForm1] = useState({
    data1: false,
    data2: false,
  });
  const [errorform2, seterrorForm2] = useState(false);
  const [errorform3, seterrorForm3] = useState(false);
  const [errorform4, seterrorForm4] = useState(false);

  const handleForm1 = () => {
    seterrorForm1({
      data1: !form1.data1,
      data2: !form1.data2,
    });

    if (Object.values(errorform1).some((v) => v)) return;
    console.log(form1);
  };

  const handleForm2 = () => {
    if (!form2.data1) {
      seterrorForm2(true);
      return;
    }

    console.log(form2);
  };

  const handleForm3 = () => {
    if (!form3.data1) {
      seterrorForm3(true);
      return;
    }

    console.log(form3);
  };

  const handleForm4 = () => {
    if (!form4.data1) {
      seterrorForm4(true);
      return;
    }

    console.log(form4);
  };

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
      <div className="flex flex-column lg:flex-row gap-3">
        <div className="w-12">
          <Card style={{ width: width >= 1440 ? "100%" : `${tableWidthPx}px` }}>
            <TabView>
              <TabPanel header="Huyết áp">
                <div>
                  <i className="pi pi-chart-line text-main1 text-2xl" />
                  <span className="font-bold text-2xl ml-3">Huyết áp</span>
                </div>
                <div className="mt-4 p-3 card-1">
                  <div className="flex flex-column md:flex-row gap-3">
                    <div>
                      <label htmlFor="ip1">Tâm thu (mmmHg)</label>
                      <InputNumber
                        inputId="ip1"
                        placeholder="Nhập tâm thu"
                        min={50}
                        max={200}
                        className="w-full mt-2"
                        inputClassName="w-12"
                        value={form1.data1}
                        onValueChange={(e) =>
                          setForm1({ ...form1, data1: e.value })
                        }
                        invalid={errorform1.data1}
                        onFocus={() =>
                          seterrorForm1({ ...errorform1, data1: false })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="ip2">Tâm trương (mmHg)</label>
                      <InputNumber
                        inputId="ip2"
                        placeholder="Nhập tâm trương"
                        min={50}
                        max={200}
                        className="w-full mt-2"
                        inputClassName="w-12"
                        value={form1.data2}
                        onValueChange={(e) =>
                          setForm1({ ...form1, data2: e.value })
                        }
                        invalid={errorform1.data2}
                        onFocus={() =>
                          seterrorForm1({ ...errorform1, data2: false })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="ip3">Ghi chú (tuỳ chọn)</label>
                    <InputTextarea
                      value={form1.data3}
                      onChange={(e) =>
                        setForm1({ ...form1, data3: e.target.value })
                      }
                      rows={5}
                      cols={30}
                      className="w-full mt-2"
                      placeholder="Ví dụ: Đo sau khi ăn xong và nghỉ ngơi 5 phút"
                    />
                  </div>
                  <Button
                    icon="pi pi-save"
                    label="Lưu huyết áp"
                    className="mt-3 w-full"
                    onClick={handleForm1}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Nhịp tim">
                <div>
                  <i className="pi pi-heart text-main1 text-2xl" />
                  <span className="font-bold text-2xl ml-3">Nhịp tim</span>
                </div>
                <div className="mt-4 p-3 card-1">
                  <div>
                    <label htmlFor="ip1">Nhịp tim (BPM)</label>
                    <InputNumber
                      inputId="ip1"
                      placeholder="Nhập nhịp tim"
                      min={50}
                      max={200}
                      className="w-full mt-2"
                      inputClassName="w-12"
                      value={form2.data1}
                      onValueChange={(e) =>
                        setForm2({ ...form2, data1: e.value })
                      }
                      invalid={errorform2}
                      onFocus={() => seterrorForm2(false)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="ip3">Ghi chú (tùy chọn)</label>
                    <InputTextarea
                      value={form2.data2}
                      onChange={(e) =>
                        setForm2({ ...form2, data2: e.target.value })
                      }
                      rows={5}
                      cols={30}
                      className="w-full mt-2"
                      placeholder="Ví dụ: Đo sau khi ăn xong và nghỉ ngơi 5 phút"
                    />
                  </div>
                  <Button
                    icon="pi pi-save"
                    label="Lưu nhịp tim"
                    className="mt-3 w-full"
                    onClick={handleForm2}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Đường huyết">
                <div>
                  <i className="pi pi-wave-pulse text-main1 text-2xl" />
                  <span className="font-bold text-2xl ml-3">Đường huyết</span>
                </div>
                <div className="mt-4 p-3 card-1">
                  <div>
                    <label htmlFor="ip1">Đường huyết (mg/dL)</label>
                    <InputNumber
                      inputId="ip1"
                      placeholder="Nhập đường huyết"
                      min={50}
                      max={200}
                      className="w-full mt-2"
                      inputClassName="w-12"
                      value={form3.data1}
                      onValueChange={(e) =>
                        setForm3({ ...form3, data1: e.value })
                      }
                      invalid={errorform3}
                      onFocus={() => seterrorForm3(false)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="ip3">Ghi chú (tùy chọn)</label>
                    <InputTextarea
                      value={form3.data2}
                      onChange={(e) =>
                        setForm3({ ...form3, data2: e.target.value })
                      }
                      rows={5}
                      cols={30}
                      className="w-full mt-2"
                      placeholder="Ví dụ: Đo sau khi ăn xong và nghỉ ngơi 5 phút"
                    />
                  </div>
                  <Button
                    icon="pi pi-save"
                    label="Lưu đường huyết"
                    className="mt-3 w-full"
                    onClick={handleForm3}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Giấc ngủ">
                <div>
                  <i className="pi pi-moon text-main1 text-2xl" />
                  <span className="font-bold text-2xl ml-3">Giấc ngủ</span>
                </div>
                <div className="mt-4 p-3 card-1">
                  <div>
                    <label htmlFor="ip1">Giờ ngủ</label>
                    <InputNumber
                      inputId="ip1"
                      placeholder="Nhập giở ngủ"
                      min={0}
                      max={50}
                      className="w-full mt-2"
                      inputClassName="w-12"
                      value={form4.data1}
                      onValueChange={(e) =>
                        setForm4({ ...form4, data1: e.value })
                      }
                      invalid={errorform4}
                      onFocus={() => seterrorForm4(false)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="ip3">Ghi chú (tùy chọn)</label>
                    <InputTextarea
                      value={form4.data2}
                      onChange={(e) =>
                        setForm4({ ...form4, data2: e.target.value })
                      }
                      rows={5}
                      cols={30}
                      className="w-full mt-2"
                      placeholder="Ví dụ: Đo sau khi ăn xong và nghỉ ngơi 5 phút"
                    />
                  </div>
                  <Button
                    icon="pi pi-save"
                    label="Lưu giờ ngủ"
                    className="mt-3 w-full"
                    onClick={handleForm4}
                  />
                </div>
              </TabPanel>
            </TabView>
          </Card>
        </div>
        <div className="w-12 lg:w-4 card-1">
          <div className="font-bold text-2xl mb-3">Hướng dẫn nhập liệu</div>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
