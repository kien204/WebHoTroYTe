import React, { useState, useContext, useEffect } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import { AuthContext } from "../../common/context/AuthContext";
import { useToast } from "../../common/hooks/useToast";
import { useApi } from "../../common/hooks/useApi";
import dataEntryApi from "../../services/api/dataEntryAPI";

const DataEntry = () => {
  const { profile } = useContext(AuthContext);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);

  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 992) tableWidthPx = width - 310;
  else if (width < 1440) tableWidthPx = width - 520;
  else tableWidthPx = width;

  const [form1, setForm1] = useState({
    userProfileId: null,
    heartRate: 0,
    bloodSugar: 0,
    systolic: null,
    diastolic: null,
    timeSleep: 0,
    note: "",
  });
  const [form2, setForm2] = useState({
    userProfileId: null,
    heartRate: null,
    bloodSugar: 0,
    systolic: 0,
    diastolic: 0,
    timeSleep: 0,
    note: "",
  });
  const [form3, setForm3] = useState({
    userProfileId: null,
    heartRate: 0,
    bloodSugar: null,
    systolic: 0,
    diastolic: 0,
    timeSleep: 0,
    note: "",
  });
  const [form4, setForm4] = useState({
    userProfileId: null,
    heartRate: 0,
    bloodSugar: 0,
    systolic: 0,
    diastolic: 0,
    timeSleep: null,
    note: "",
  });

  useEffect(() => {
    if (profile?.hoSoId) {
      setForm1((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm2((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm3((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm4((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
    }
  }, [profile]);

  const [errorform1, seterrorForm1] = useState({
    data1: false,
    data2: false,
  });
  const [errorform2, seterrorForm2] = useState(false);
  const [errorform3, seterrorForm3] = useState(false);
  const [errorform4, seterrorForm4] = useState(false);

  const callAPi = async (data) => {
    try {
      const res = await callApi(() => dataEntryApi.data(data));
      showToast("success", "Thành công", "Lưu huyết áp thành công");
      return res;
    } catch {
      //
    }
  };

  const handleForm1 = async () => {
    const newError = {
      data1: !form1.systolic,
      data2: !form1.diastolic,
    };

    seterrorForm1(newError);
    if (Object.values(newError).some((v) => v)) return;
    console.log(form1);
    const res = callAPi(form1);
    console.log(res);
    setForm1({ ...form1, systolic: null, diastolic: null });
  };

  const handleForm2 = () => {
    if (!form2.heartRate) {
      seterrorForm2(true);
      return;
    }

    console.log(form2);
    const res = callAPi(form2);
    console.log(res);
    setForm2({ ...form2, heartRate: null });
  };

  const handleForm3 = () => {
    if (!form3.bloodSugar) {
      seterrorForm3(true);
      return;
    }

    console.log(form3);
    const res = callAPi(form3);
    console.log(res);
    setForm3({ ...form3, bloodSugar: null });
  };

  const handleForm4 = () => {
    if (!form4.timeSleep) {
      seterrorForm4(true);
      return;
    }

    console.log(form4);
    const res = callAPi(form4);
    console.log(res);
    setForm4({ ...form4, timeSleep: null });
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
        <div className="w-12 ">
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
                        className="w-full mt-2"
                        inputClassName="w-12"
                        min={1}
                        mode="decimal"
                        minFractionDigits={0}
                        maxFractionDigits={0}
                        useGrouping={false}
                        value={form1.systolic}
                        onValueChange={(e) =>
                          setForm1({ ...form1, systolic: e.value })
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
                        className="w-full mt-2"
                        inputClassName="w-12"
                        min={1}
                        mode="decimal"
                        minFractionDigits={0}
                        maxFractionDigits={0}
                        useGrouping={false}
                        value={form1.diastolic}
                        onValueChange={(e) =>
                          setForm1({ ...form1, diastolic: e.value })
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
                      value={form1.note}
                      onChange={(e) =>
                        setForm1({ ...form1, note: e.target.value })
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
                      className="w-full mt-2"
                      inputClassName="w-12"
                      min={1}
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                      value={form2.heartRate}
                      onValueChange={(e) =>
                        setForm2({ ...form2, heartRate: e.value })
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
                      className="w-full mt-2"
                      inputClassName="w-12"
                      min={1}
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                      value={form3.bloodSugar}
                      onValueChange={(e) =>
                        setForm3({ ...form3, bloodSugar: e.value })
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
                      className="w-full mt-2"
                      inputClassName="w-12"
                      min={1}
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                      value={form4.timeSleep}
                      onValueChange={(e) =>
                        setForm4({ ...form4, timeSleep: e.value })
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
        <div className="w-12 lg:w-5 card-1 p-3">
          <div className="font-bold text-xl mb-3">
            <i className="pi pi-clock font-bold" /> Dứ liệu gần đây
          </div>
          <div className="flex flex-column gap-3 ">
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-chart-line text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">120/80 mmHg</div>
                  <div className="text-sm">08:30 12/06/2024</div>
                  <div>Sau khi nghỉ 5 phút</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-heart text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">72 BPM</div>
                  <div className="text-sm">08:30 12/06/2024</div>
                  <div>Sau khi nghỉ 5 phút</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-wave-pulse text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">95 mg/dL</div>
                  <div className="text-sm">08:30 12/06/2024</div>
                  <div>Sau khi ăn tối</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-moon text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">7 tiếng</div>
                  <div className="text-sm">08:30 12/06/2024</div>
                  <div>Ngủ ngon</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
