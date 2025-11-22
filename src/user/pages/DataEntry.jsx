import React, { useState, useContext, useEffect } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
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

  const [firstForm1, setfirstForm1] = useState(false);
  const [firstForm2, setfirstForm2] = useState(false);
  const [firstForm3, setfirstForm3] = useState(false);
  const [firstForm4, setfirstForm4] = useState(false);

  const [editForm1, setEditForm1] = useState(false);
  const [editForm2, setEditForm2] = useState(false);
  const [editForm3, setEditForm3] = useState(false);
  const [editForm4, setEditForm4] = useState(false);

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
    timeWake: "",
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
  const [errorform4, seterrorForm4] = useState({
    data1: false,
    data2: false,
  });

  useEffect(() => {
    if (profile?.hoSoId) {
      setForm1((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm2((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm3((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
      setForm4((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
    }
  }, [profile?.hoSoId]);

  const getRecentlyForm1 = async () => {
    try {
      const res = await callApi(
        () => dataEntryApi.getnewfrom1(profile.hoSoId),
        false
      );
      setRecentlyForm1(res.record);
    } catch {
      //
    }
    try {
      const res = await callApi(
        () => dataEntryApi.getTodayfrom1(profile.hoSoId),
        false
      );
      setForm1({
        ...form1,
        diastolic: res.record.diastolic,
        systolic: res.record.systolic,
        note: res.record.note,
      });
      setfirstForm1(false);
    } catch {
      setfirstForm1(true);
    }
  };

  const getRecentlyForm2 = async () => {
    try {
      const res = await callApi(
        () => dataEntryApi.getnewfrom2(profile.hoSoId),
        false
      );
      setRecentlyForm2(res.record);
    } catch {
      //
    }
    try {
      const res = await callApi(
        () => dataEntryApi.getTodayfrom2(profile.hoSoId),
        false
      );
      setForm2({
        ...form2,
        heartRate: res.record.heartRate,
        note: res.record.note,
      });
      setfirstForm2(false);
    } catch {
      setfirstForm2(true);
    }
  };

  const getRecentlyForm3 = async () => {
    try {
      const res = await callApi(
        () => dataEntryApi.getnewfrom3(profile.hoSoId),
        false
      );
      setRecentlyForm3(res.record);
    } catch {
      //
    }
    try {
      const res = await callApi(
        () => dataEntryApi.getTodayfrom3(profile.hoSoId),
        false
      );
      setForm3({
        ...form3,
        bloodSugar: res.record.bloodSugar,
        note: res.record.note,
      });
      setfirstForm3(false);
    } catch {
      setfirstForm3(true);
    }
  };

  const getRecentlyForm4 = async () => {
    try {
      const res = await callApi(
        () => dataEntryApi.getnewfrom4(profile.hoSoId),
        false
      );
      setRecentlyForm4(res.record);
    } catch {
      //
    }
    try {
      const res = await callApi(
        () => dataEntryApi.getTodayfrom4(profile.hoSoId),
        false
      );
      setForm4({
        ...form4,
        timeSleep: res.record.sleepTime ? new Date(res.record.sleepTime) : null,
        timeWake: res.record.wakeTime ? new Date(res.record.wakeTime) : null,
        note: res.record.sleepAlert,
      });

      setfirstForm4(false);
    } catch {
      setfirstForm4(true);
    }
  };

  useEffect(() => {
    if (Object.keys(profile).length === 0 || !profile?.hoSoId) return;
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
    if (!form4.timeSleep || !form4.timeWake) return true;
    if (form4.timeSleep > form4.timeWake) return true;
  };

  const handleCancelForm1 = () => {
    setForm1({
      ...form1,
      diastolic: recentlyForm1.diastolic,
      systolic: recentlyForm1.systolic,
      note: recentlyForm1.note,
    });

    seterrorForm1({
      data1: false,
      data2: false,
    });
    setEditForm1(false);
  };

  const handleCancelForm2 = () => {
    setForm2({
      ...form2,
      heartRate: recentlyForm2.heartRate,
      note: recentlyForm2.note,
    });

    seterrorForm2(false);
    setEditForm2(false);
  };

  const handleCancelForm3 = () => {
    setForm3({
      ...form3,
      bloodSugar: recentlyForm3.bloodSugar,
      note: recentlyForm3.note,
    });
    seterrorForm3(false);
    setEditForm3(false);
  };

  const handleCancelForm4 = () => {
    setForm4({
      ...form4,
      timeSleep: recentlyForm4.sleepTime
        ? new Date(recentlyForm4.sleepTime)
        : null,
      timeWake: recentlyForm4.wakeTime
        ? new Date(recentlyForm4.wakeTime)
        : null,
      note: recentlyForm4.sleepAlert,
    });
    seterrorForm4({
      data1: false,
      data2: false,
    });
    setEditForm4(false);
  };

  const handleForm1 = async () => {
    const newError = {
      data1: checkForm11(),
      data2: checkForm12(),
    };
    seterrorForm1(newError);

    if (Object.values(newError).some((v) => v)) return;

    try {
      if (firstForm1) {
        await callApi(() => dataEntryApi.createform1(form1));
      } else {
        await callApi(() =>
          dataEntryApi.putform1(
            {
              systolic: form1.systolic,
              diastolic: form1.diastolic,
              note: form1.note,
            },
            profile?.hoSoId
          )
        );
        setEditForm1(false);
      }
      showToast("success", "Thành công", "Lưu huyết áp Thành công");
      getRecentlyForm1();
    } catch {
      //
    }
  };

  const handleForm2 = async () => {
    seterrorForm2(checkForm2());

    if (checkForm2()) return;

    try {
      if (firstForm2) {
        await callApi(() => dataEntryApi.createform2(form2));
      } else {
        await callApi(() =>
          dataEntryApi.putform2(
            {
              heartRate: form2.heartRate,
              note: form2.note,
            },
            profile?.hoSoId
          )
        );
        setEditForm2(false);
      }
      showToast("success", "Thành công", "Lưu nhịp tim Thành công");
      getRecentlyForm2();
    } catch {
      //
    }
  };

  const handleForm3 = async () => {
    seterrorForm3(checkForm3());
    if (checkForm3()) return;

    try {
      if (firstForm3) {
        await callApi(() => dataEntryApi.createform3(form3));
      } else {
        console.log(form3);

        await callApi(() =>
          dataEntryApi.putform3(
            {
              bloodSugar: form3.bloodSugar,
              note: form3.note,
            },
            profile?.hoSoId
          )
        );
        setEditForm3(false);
      }
      showToast("success", "Thành công", "Lưu đường huyết Thành công");
      getRecentlyForm3();
    } catch {
      //
    }
  };

  const handleForm4 = async () => {
    const newError = {
      data1: checkForm4(),
      data2: checkForm4(),
    };
    seterrorForm4(newError);

    if (Object.values(newError).some((v) => v)) return;

    try {
      if (firstForm4) {
        await callApi(() => dataEntryApi.createform4(form4));
      } else {
        await callApi(() =>
          dataEntryApi.putform4(
            {
              timeSleep: form4.timeSleep,
              timeWake: form4.timeWake,
              note: form4.note,
            },
            profile?.hoSoId
          )
        );
        setEditForm4(false);
      }
      showToast("success", "Thành công", "Lưu đường huyết Thành công");
      getRecentlyForm4();
    } catch {
      //
    }
  };

  return (
    <div className="flex flex-column dataentry">
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
                        id="ip1"
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
                        disabled={!editForm1 && !firstForm1}
                      />
                      {errorform1.data1 && form1.systolic && (
                        <div className="text-sm mt-1" style={{ color: "red" }}>
                          {form1.systolic < 30 || form1.systolic > 250
                            ? "Giá trị huyết áp tâm thu phải nằm trong khoảng 30 - 250 mmHg!"
                            : "Gía trị nhập phải là số nguyên dương! Vui lòng nhập lại!"}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="ip2">Tâm trương (mmHg)</label>
                      <InputText
                        id="ip2"
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
                        disabled={!editForm1 && !firstForm1}
                      />
                      {errorform1.data2 && form1.diastolic && (
                        <div className="text-sm mt-1" style={{ color: "red" }}>
                          {form1.diastolic < 20 || form1.diastolic > 200
                            ? "Giá trị huyết áp tâm trương phải nằm trong khoảng 20 - 200 mmHg!"
                            : "Gía trị nhập phải là số nguyên dương! Vui lòng nhập lại!"}
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
                      disabled={!editForm1 && !firstForm1}
                    />
                  </div>
                  <div className="mt-5">
                    {firstForm1 ? (
                      <Button
                        icon="pi pi-save"
                        label="Lưu huyết áp"
                        className="mt-3 w-full flex justify-content-center"
                        onClick={handleForm1}
                      />
                    ) : (
                      <>
                        {editForm1 ? (
                          <>
                            <Button
                              className="mr-3"
                              type="button"
                              label="Lưu thay đổi"
                              icon="pi pi-save"
                              onClick={handleForm1}
                            />
                            <Button
                              type="button"
                              label="Hủy"
                              icon="pi pi-times"
                              severity="secondary"
                              onClick={handleCancelForm1}
                            />
                          </>
                        ) : (
                          <Button
                            type="button"
                            label="Sửa"
                            icon="pi pi-pencil"
                            onClick={() => setEditForm1(true)}
                          />
                        )}
                      </>
                    )}
                  </div>
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
                      id="ip1"
                      placeholder="Nhập nhịp tim"
                      className="w-full mt-2"
                      value={form2.heartRate}
                      onChange={(e) =>
                        setForm2({ ...form2, heartRate: e.target.value })
                      }
                      invalid={errorform2}
                      onFocus={() => seterrorForm2(false)}
                      disabled={!editForm2 && !firstForm2}
                    />

                    {errorform2 && form2.heartRate && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {form2.heartRate < 30 || form2.heartRate > 300
                          ? "Giá trị nhịp tim phải nằm trong khoảng 30 - 300 BPM!"
                          : "Gía trị nhập phải là số nguyên dương! Vui lòng nhập lại!"}
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
                      disabled={!editForm2 && !firstForm2}
                      placeholder="Ví dụ: Đo sau khi ăn xong và nghỉ ngơi 5 phút"
                    />
                  </div>
                  <div className="mt-5">
                    {firstForm2 ? (
                      <Button
                        icon="pi pi-save"
                        label="Lưu nhịp tim"
                        className="mt-3 w-full  flex justify-content-center"
                        clas
                        onClick={handleForm2}
                      />
                    ) : (
                      <>
                        {editForm2 ? (
                          <>
                            <Button
                              className="mr-3"
                              type="button"
                              label="Lưu thay đổi"
                              icon="pi pi-save"
                              onClick={handleForm2}
                            />
                            <Button
                              type="button"
                              label="Hủy"
                              icon="pi pi-times"
                              severity="secondary"
                              onClick={handleCancelForm2}
                            />
                          </>
                        ) : (
                          <Button
                            type="button"
                            label="Sửa"
                            icon="pi pi-pencil"
                            onClick={() => setEditForm2(true)}
                          />
                        )}
                      </>
                    )}
                  </div>
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
                      id="ip1"
                      placeholder="Nhập đường huyết"
                      className="w-full mt-2"
                      value={form3.bloodSugar}
                      onChange={(e) =>
                        setForm3({ ...form3, bloodSugar: e.target.value })
                      }
                      invalid={errorform3}
                      onFocus={() => seterrorForm3(false)}
                      disabled={!editForm3 && !firstForm3}
                    />

                    {errorform3 && form3.bloodSugar && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {form3.bloodSugar < 0 || form3.bloodSugar > 200
                          ? "Giá trị đường huyết phải nằm trong khoảng 0 - 200 mg/dL!"
                          : "Gía trị nhập phải là số nguyên dương! Vui lòng nhập lại!"}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <label htmlFor="ip3">Ghi chú (tùy chọn)</label>
                    <InputTextarea
                      value={form3.note}
                      onChange={(e) =>
                        setForm3({ ...form3, note: e.target.value })
                      }
                      rows={5}
                      cols={30}
                      className="w-full mt-2"
                      disabled={!editForm3 && !firstForm3}
                      placeholder="Ví dụ: Đo sau khi ăn xong và nghỉ ngơi 5 phút"
                    />
                  </div>
                  <div className="mt-5">
                    {firstForm3 ? (
                      <Button
                        icon="pi pi-save"
                        label="Lưu đường huyết"
                        className="mt-3 w-full  flex justify-content-center"
                        onClick={handleForm3}
                      />
                    ) : (
                      <>
                        {editForm3 ? (
                          <>
                            <Button
                              className="mr-3"
                              type="button"
                              label="Lưu thay đổi"
                              icon="pi pi-save"
                              onClick={handleForm3}
                            />
                            <Button
                              type="button"
                              label="Hủy"
                              icon="pi pi-times"
                              severity="secondary"
                              onClick={handleCancelForm3}
                            />
                          </>
                        ) : (
                          <Button
                            type="button"
                            label="Sửa"
                            icon="pi pi-pencil"
                            onClick={() => setEditForm3(true)}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Giấc ngủ">
                <div>
                  <i className="pi pi-moon text-main1 text-2xl" />
                  <span className="font-bold text-2xl ml-3">Giấc ngủ</span>
                </div>
                <div className="mt-4 p-3 card-1">
                  <div className="flex flex-column md:flex-row gap-3">
                    <div>
                      <label htmlFor="ip1">Ngủ lúc</label> <br />
                      <Calendar
                        id="ip1"
                        value={form4.timeSleep}
                        locale="vi"
                        onChange={(e) =>
                          setForm4({ ...form4, timeSleep: e.target.value })
                        }
                        placeholder="dd/mm/yyyy"
                        dateFormat="dd/mm/yy"
                        showTime
                        maxDate={new Date()}
                        minDate={
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        hourFormat="24"
                        className="mt-3"
                        disabled={!editForm4 && !firstForm4}
                        invalid={errorform4.data1}
                        onFocus={() =>
                          seterrorForm4({ ...errorform4, data1: false })
                        }
                      />
                      {errorform4.data1 && form4.timeSleep && (
                        <div className="text-sm mt-1" style={{ color: "red" }}>
                          Thời gian thức dậy phải sau thời gian đi ngủ{" "}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="ip1">Dậy lúc</label> <br />
                      <Calendar
                        id="ip1"
                        value={form4.timeWake}
                        locale="vi"
                        onChange={(e) =>
                          setForm4({ ...form4, timeWake: e.target.value })
                        }
                        placeholder="dd/mm/yyyy"
                        dateFormat="dd/mm/yy"
                        showTime
                        maxDate={new Date()}
                        minDate={
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        hourFormat="24"
                        className="mt-3"
                        disabled={!editForm4 && !firstForm4}
                        invalid={errorform4.data2}
                        onFocus={() =>
                          seterrorForm4({ ...errorform4, data2: false })
                        }
                      />
                    </div>
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
                      disabled={!editForm4 && !firstForm4}
                    />
                  </div>
                  <div className="mt-5">
                    {firstForm4 ? (
                      <Button
                        icon="pi pi-save"
                        label="Lưu giấc ngủ"
                        className="mt-3 w-full  flex justify-content-center"
                        onClick={handleForm4}
                      />
                    ) : (
                      <>
                        {editForm4 ? (
                          <>
                            <Button
                              className="mr-3"
                              type="button"
                              label="Lưu thay đổi"
                              icon="pi pi-save"
                              onClick={handleForm4}
                            />
                            <Button
                              type="button"
                              label="Hủy"
                              icon="pi pi-times"
                              severity="secondary"
                              onClick={handleCancelForm4}
                            />
                          </>
                        ) : (
                          <Button
                            type="button"
                            label="Sửa"
                            icon="pi pi-pencil"
                            onClick={() => setEditForm4(true)}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </Card>
        </div>
        <div className="w-12 lg:w-5 card-1 p-3">
          <div className="font-bold text-xl mb-3">
            <i className="pi pi-clock font-bold" /> Dữ liệu gần đây
          </div>
          <div className="flex flex-column gap-3 ">
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-chart-line text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm1?.systolic ?? "--"}/
                    {recentlyForm1?.diastolic ?? "--"} mmHg
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm1?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
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
                    {recentlyForm1?.note ?? "--"}
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-heart text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm2?.heartRate ?? "--"} BPM
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm2?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
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
                    {recentlyForm2?.note ?? "--"}
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-wave-pulse text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm3?.bloodSugar ?? "--"} mg/dL
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm3?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
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
                    {recentlyForm3?.note ?? "--"}
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-moon text-main1 text-2xl font-bold" />
                <div className="flex flex-column">
                  <div className="font-bold">
                    {recentlyForm4?.hoursSleep ?? "--"} tiếng
                  </div>
                  <div className="text-sm">
                    {dayjs(recentlyForm4?.recordedAt).format(
                      "HH:mm DD/MM/YYYY"
                    )}
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
                    {recentlyForm4?.note ?? "--"}
                  </div>
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
