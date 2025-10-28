import React, { useState, useContext, useEffect } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import dayjs from "dayjs";

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
  else if (width < 992) tableWidthPx = width - 330;
  else if (width < 1440) tableWidthPx = width - 550;
  else tableWidthPx = width;

  const [form1, setForm1] = useState({
    userProfileId: "",
    systolic: "",
    diastolic: "",
    note: "",
  });
  const [form2, setForm2] = useState({
    userProfileId: "",
    heartRate: "",
    note: "",
  });
  const [form3, setForm3] = useState({
    userProfileId: "",
    bloodSugar: "",
    note: "",
  });
  const [form4, setForm4] = useState({
    userProfileId: "",
    timeSleep: "",
    note: "",
  });

  const [recentlyForm1, setRecentlyForm1] = useState("");
  const [recentlyForm2, setRecentlyForm2] = useState("");
  const [recentlyForm3, setRecentlyForm3] = useState("");
  const [recentlyForm4, setRecentlyForm4] = useState("");

  const [errorform1, seterrorForm1] = useState({
    data1: false,
    data2: false,
  });
  const [errorform2, seterrorForm2] = useState(false);
  const [errorform3, seterrorForm3] = useState(false);
  const [errorform4, seterrorForm4] = useState(false);

  useEffect(() => {
    if (profile?.hoSoId) {
      setForm1((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm2((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm3((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm4((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
    }
  }, [profile]);

  const getRecentlyForm1 = async () => {
    try {
      const res = await callApi(() => dataEntryApi.getnewfrom1(profile.hoSoId));
      setRecentlyForm1(res.record);
    } catch {
      //
    }
  };

  const getRecentlyForm2 = async () => {
    try {
      const res = await callApi(() => dataEntryApi.getnewfrom2(profile.hoSoId));
      setRecentlyForm2(res.record);
    } catch {
      //
    }
  };

  const getRecentlyForm3 = async () => {
    try {
      const res = await callApi(() => dataEntryApi.getnewfrom3(profile.hoSoId));
      setRecentlyForm3(res.record);
    } catch {
      //
    }
  };

  const getRecentlyForm4 = async () => {
    try {
      const res = await callApi(() => dataEntryApi.getnewfrom4(profile.hoSoId));
      setRecentlyForm4(res.record);
    } catch {
      //
    }
  };

  useEffect(() => {
    if (!profile?.hoSoId) return;
    (async () => {
      await Promise.all([
        getRecentlyForm1(),
        getRecentlyForm2(),
        getRecentlyForm3(),
        getRecentlyForm4(),
      ]);
    })();
  }, [profile?.hoSoId]);


  const checkForm12 = () => {
    if (!form1.diastolic) return true;
    if (!/^-?\d+$/.test(form1.diastolic)) return true;
    if (isNaN(form1.diastolic)) return true;
    if (form1.diastolic < 20 || form1.diastolic > 200) return true;
  };

  const checkForm11 = () => {
    if (!form1.systolic) return true;
    if (!/^-?\d+$/.test(form1.systolic)) return true;
    if (isNaN(form1.systolic)) return true;
    if (form1.systolic < 30 || form1.systolic > 250) return true;
  };

  const checkForm2 = () => {
    if (!form2.heartRate) return true;
    if (!/^-?\d+$/.test(form2.heartRate)) return true;
    if (isNaN(form2.heartRate)) return true;
    if (form2.heartRate < 30 || form2.heartRate > 300) return true;
  };

  const checkForm3 = () => {
    if (!form3.bloodSugar) return true;
    if (!/^-?\d+$/.test(form3.bloodSugar)) return true;
    if (isNaN(form3.bloodSugar)) return true;
    if (form3.bloodSugar < 0 || form3.bloodSugar > 200) return true;
  };

  const checkForm4 = () => {
    if (!form4.timeSleep) return true;
    if (!/^-?\d+$/.test(form4.timeSleep)) return true;
    if (isNaN(form4.timeSleep)) return true;
    if (form4.timeSleep < 0 || form4.timeSleep > 24) return true;
  };

  const handleForm1 = async () => {
    const newError = {
      data1: checkForm11(),
      data2: checkForm12(),
    };
    seterrorForm1(newError);

    if (Object.values(newError).some((v) => v)) return;

    try {
      const res = await callApi(() => dataEntryApi.createform1(form1));
      console.log(res);
      showToast("success", "Thành công", "Lưu huyết áp Thành công");
      setForm1((prev) => ({
        ...prev,
        systolic: "",
        diastolic: "",
        note: "",
      }));
      getRecentlyForm1();
    } catch {
      //
    }
  };

  const handleForm2 = async () => {
    seterrorForm2(checkForm2());
    if (errorform2) return;

    try {
      const res = await callApi(() => dataEntryApi.createform2(form2));
      console.log(res);
      showToast("success", "Thành công", "Lưu nhịp tim Thành công");
      setForm2((prev) => ({
        ...prev,
        heartRate: "",
        note: "",
      }));
      getRecentlyForm2();
    } catch {
      //
    }
  };

  const handleForm3 = async () => {
    seterrorForm3(checkForm3());
    if (errorform3) return;

    console.log(form3);

    try {
      const res = await callApi(() => dataEntryApi.createform3(form3));
      console.log(res);
      showToast("success", "Thành công", "Lưu đường huyết Thành công");
      setForm1((prev) => ({
        ...prev,
        bloodSugar: "",
        note: "",
      }));
      getRecentlyForm3();
    } catch {
      //
    }
  };

  const handleForm4 = async () => {
    seterrorForm4(checkForm4());
    if (errorform4) return;

    console.log(form4);

    try {
      const res = await callApi(() => dataEntryApi.createform4(form4));
      console.log(res);
      showToast("success", "Thành công", "Lưu giấc ngủ Thành công");
      setForm1((prev) => ({
        ...prev,
        timeSleep: "",
        note: "",
      }));
      getRecentlyForm4();
    } catch {
      //
    }
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
                      <label htmlFor="ip1">Tâm thu (mmHg)</label>
                      <InputText
                        inputId="ip1"
                        placeholder="Nhập tâm thu"
                        className="w-full mt-2"
                        value={form1.systolic}
                        onChange={(e) =>
                          setForm1({ ...form1, systolic: e.target.value })
                        }
                        invalid={errorform1.data1}
                        onFocus={() =>
                          seterrorForm1({ ...errorform1, data1: false })
                        }
                      />
                      {errorform1.data1 && form1.systolic && (
                        <div className="text-sm mt-1" style={{ color: "red" }}>
                          {form1.systolic < 30 || form1.systolic > 250
                            ? "Giá trị huyết áp tâm thu phải nằm trong khoảng 30 - 250 mmHg!"
                            : "Dữ liệu không hợp lệ"}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="ip2">Tâm trương (mmHg)</label>
                      <InputText
                        inputId="ip2"
                        placeholder="Nhập tâm trương"
                        className="w-full mt-2"
                        value={form1.diastolic}
                        onChange={(e) =>
                          setForm1({ ...form1, diastolic: e.target.value })
                        }
                        invalid={errorform1.data2}
                        onFocus={() =>
                          seterrorForm1({ ...errorform1, data2: false })
                        }
                      />
                      {errorform1.data2 && form1.diastolic && (
                        <div className="text-sm mt-1" style={{ color: "red" }}>
                          {form1.diastolic < 20 || form1.diastolic > 200
                            ? "Giá trị huyết áp tâm trương phải nằm trong khoảng 20 - 200 mmHg!"
                            : "Dữ liệu không hợp lệ"}
                        </div>
                      )}
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
                    <InputText
                      inputId="ip1"
                      placeholder="Nhập nhịp tim"
                      className="w-full mt-2"
                      value={form2.heartRate}
                      onChange={(e) =>
                        setForm2({ ...form2, heartRate: e.target.value })
                      }
                      invalid={errorform2}
                      onFocus={() => seterrorForm2(false)}
                    />

                    {errorform2 && form2.heartRate && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {form2.heartRate < 30 || form2.heartRate > 300
                          ? "Giá trị nhịp tim phải nằm trong khoảng 30 - 300 BPM!"
                          : "Dữ liệu không hợp lệ"}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <label htmlFor="ip3">Ghi chú (tùy chọn)</label>
                    <InputTextarea
                      value={form2.note}
                      onChange={(e) =>
                        setForm2({ ...form2, note: e.target.value })
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
                    <InputText
                      inputId="ip1"
                      placeholder="Nhập đường huyết"
                      className="w-full mt-2"
                      value={form3.bloodSugar}
                      onChange={(e) =>
                        setForm3({ ...form3, bloodSugar: e.target.value })
                      }
                      invalid={errorform3}
                      onFocus={() => seterrorForm3(false)}
                    />

                    {errorform3 && form3.bloodSugar && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {form3.bloodSugar < 0 || form3.bloodSugar > 200
                          ? "Giá trị đường huyết phải nằm trong khoảng 0 - 200 mg/dL!"
                          : "Dữ liệu không hợp lệ"}
                      </div>
                    )}
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
                    <InputText
                      inputId="ip1"
                      placeholder="Nhập giở ngủ"
                      className="w-full mt-2"
                      value={form4.timeSleep}
                      onChange={(e) =>
                        setForm4({ ...form4, timeSleep: e.target.value })
                      }
                      invalid={errorform4}
                      onFocus={() => seterrorForm4(false)}
                    />

                    {errorform4 && form4.timeSleep && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {form4.timeSleep < 0 || form4.timeSleep > 24
                          ? "Dữ liệu phải làm trong khoảng 0-24"
                          : "Dữ liệu không hợp lệ"}
                      </div>
                    )}
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
                  <div className="font-bold">
                    {recentlyForm1?.systolic}/{recentlyForm1?.diastolic} mmHg
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm1?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </div>
                  <div>{recentlyForm1?.note}</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-heart text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm2?.heartRate} BPM
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm2?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </div>
                  <div>{recentlyForm2?.note}</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-wave-pulse text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm3?.bloodSugar} mg/dL
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm3?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </div>
                  <div>{recentlyForm3?.note}</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-moon text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm4?.timeSleep} tiếng
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm4?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </div>
                  <div>{recentlyForm4?.note}</div>
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
