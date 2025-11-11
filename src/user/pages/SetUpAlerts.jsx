import React, { useState, useContext, useEffect } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { AuthContext } from "../../common/context/AuthContext";
import { useToast } from "../../common/hooks/useToast";
import { useApi } from "../../common/hooks/useApi";
import setUpAlertsApi from "../../services/api/setUpAlertsApi";

const SetUpAlerts = () => {
  const { showToast } = useToast();
  const { profile } = useContext(AuthContext);
  const { callApi } = useApi(showToast);
  const [first, setfirst] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    userProfileId: "",
    minHeartRate: "",
    maxHeartRate: "",
    minBloodSugar: "",
    maxBloodSugar: "",
    minSleep: "",
    maxSleep: "",
    minSystolic: "",
    maxSystolic: "",
    minDiastolic: "",
    maxDiastolic: "",
  });

  const [formDataOld, setFormDataOld] = useState({
    userProfileId: "",
    minHeartRate: "",
    maxHeartRate: "",
    minBloodSugar: "",
    maxBloodSugar: "",
    minSleep: "",
    maxSleep: "",
    minSystolic: "",
    maxSystolic: "",
    minDiastolic: "",
    maxDiastolic: "",
  });

  const [errorFormData, setErrorFormData] = useState({
    errorMinHeartRate: false,
    errorMaxHeartRate: false,
    errorMinBloodSugar: false,
    errorMaxBloodSugar: false,
    errorminSleep: false,
    errormaxSleep: false,
    errorminSystolic: false,
    errormaxSystolic: false,
    errorminDiastolic: false,
    errormaxDiastolic: false,
  });

  useEffect(() => {
    if (profile?.hoSoId) {
      setFormData((prev) => ({ ...prev, userProfileId: profile.hoSoId }));
    }
  }, [profile?.hoSoId]);

  useEffect(() => {
    if (Object.keys(profile).length === 0 || !profile?.hoSoId) return;
    (async () => {
      await getData();
    })();
  }, [profile?.hoSoId]);


  const getData = async () => {
    try {
      const res = await callApi(
        () => setUpAlertsApi.get(profile?.hoSoId),
        false
      );
      const data = {
        userProfileId: res.userProfileId ?? profile?.hoSoId,
        minHeartRate: res.minHeartRate ?? "",
        maxHeartRate: res.maxHeartRate ?? "",
        minBloodSugar: res.minBloodSugar ?? "",
        maxBloodSugar: res.maxBloodSugar ?? "",
        minSystolic: res.minSystolic ?? "",
        maxSystolic: res.maxSystolic ?? "",
        minDiastolic: res.minDiastolic ?? "",
        maxDiastolic: res.maxDiastolic ?? "",
        minSleep: res.minSleep ?? "",
        maxSleep: res.maxSleep ?? "",
      };
      setFormData(data);
      setFormDataOld(data);

      setfirst(false);
    } catch {
      setfirst(true);
    }
  };

  const checkMinHeart = () => {
    if (!formData.minHeartRate) return true;
    if (isNaN(formData.minHeartRate)) return true;
    const min = Number(formData.minHeartRate);
    const max = Number(formData.maxHeartRate);
    if (min < 30) return true;
    if (min > 300) return true;
    if (max && min > max) return true;
  };

  const checkMaxHeart = () => {
    if (!formData.maxHeartRate) return true;
    if (isNaN(formData.maxHeartRate)) return true;
    const max = Number(formData.maxHeartRate);
    if (max < 30) return true;
    if (max > 300) return true;
  };

  const checkMinBlood = () => {
    if (!formData.minBloodSugar) return true;
    if (isNaN(formData.minBloodSugar)) return true;

    const min = Number(formData.minBloodSugar);
    const max = Number(formData.maxBloodSugar);
    if (min < 0) return true;
    if (min > 200) return true;
    if (max && min > max) return true;
  };

  const checkMaxBlood = () => {
    if (!formData.maxBloodSugar) return true;
    if (isNaN(formData.maxBloodSugar)) return true;
    const max = Number(formData.maxBloodSugar);
    if (max < 0) return true;
    if (max > 200) return true;
  };

  const checkMinSleep = () => {
    if (!formData.minSleep) return true;
    if (isNaN(formData.minSleep)) return true;
    const min = Number(formData.minSleep);
    if (min < 0) return true;
    if (min > 24) return true;
  };

  const checkMaxSleep = () => {
    if (!formData.maxSleep) return true;
    if (isNaN(formData.maxSleep)) return true;
    const max = Number(formData.maxSleep);
    if (max < 0) return true;
    if (max > 24) return true;
  };

  const checkMinSystolic = () => {
    if (!formData.minSystolic) return true;
    if (isNaN(formData.minSystolic)) return true;
    const min = Number(formData.minSystolic);
    const max = Number(formData.maxSystolic);
    if (min < 30) return true;
    if (min > 250) return true;
    if (max && min > max) return true;
  };

  const checkMaxSystolic = () => {
    if (!formData.maxSystolic) return true;
    if (isNaN(formData.maxSystolic)) return true;
    const max = Number(formData.maxSystolic);
    if (max < 30) return true;
    if (max > 250) return true;
  };

  const checkMinDiastolic = () => {
    if (!formData.minDiastolic) return true;
    if (isNaN(formData.minDiastolic)) return true;
    const min = Number(formData.minDiastolic);
    const max = Number(formData.maxDiastolic);
    if (min < 20) return true;
    if (min > 200) return true;
    if (max && min > max) return true;
  };

  const checkMaxDiastolic = () => {
    if (!formData.maxDiastolic) return true;
    if (isNaN(formData.maxDiastolic)) return true;
    const max = Number(formData.maxDiastolic);
    if (max < 20) return true;
    if (max > 200) return true;
  };

  const parseFormData = () => ({
    ...formData,
    userProfileId: Number(profile?.hoSoId),
    minHeartRate: formData.minHeartRate
      ? parseInt(formData.minHeartRate)
      : null,
    maxHeartRate: formData.maxHeartRate
      ? parseInt(formData.maxHeartRate)
      : null,
    minBloodSugar: formData.minBloodSugar
      ? parseInt(formData.minBloodSugar)
      : null,
    maxBloodSugar: formData.maxBloodSugar
      ? parseInt(formData.maxBloodSugar)
      : null,
    minSystolic: formData.minSystolic ? parseInt(formData.minSystolic) : null,
    maxSystolic: formData.maxSystolic ? parseInt(formData.maxSystolic) : null,
    minDiastolic: formData.minDiastolic
      ? parseInt(formData.minDiastolic)
      : null,
    maxDiastolic: formData.maxDiastolic
      ? parseInt(formData.maxDiastolic)
      : null,
    minSleep: formData.minSleep ? parseInt(formData.minSleep) : null,
    maxSleep: formData.maxSleep ? parseInt(formData.maxSleep) : null,
  });

  const handleButton = async () => {
    const newError = {
      errorMinHeartRate: checkMinHeart(),
      errorMaxHeartRate: checkMaxHeart(),
      errorMinBloodSugar: checkMinBlood(),
      errorMaxBloodSugar: checkMaxBlood(),
      errorminSleep: checkMinSleep(),
      errormaxSleep: checkMaxSleep(),
      errorminSystolic: checkMinSystolic(),
      errormaxSystolic: checkMaxSystolic(),
      errorminDiastolic: checkMinDiastolic(),
      errormaxDiastolic: checkMaxDiastolic(),
    };
    setErrorFormData(newError);

    const dataToSend = parseFormData();

    if (Object.values(newError).some((value) => value === true)) return;

    try {
      if (first) {
        await callApi(() => setUpAlertsApi.setAlertThresholds(dataToSend));
      } else {
        await callApi(() => setUpAlertsApi.put(dataToSend, profile?.hoSoId));
        setIsEdit(false);
      }
      showToast("success", "Thành công", "Lưu thiết lập Thành công");
      getData();
    } catch {
      //
    }
  };

  const handleCancel = () => {
    setFormData(formDataOld);
    setIsEdit(false);
  };

  return (
    <div className="flex flex-column">
      <div>
        <div className="font-bold text-2xl">Thiết lập cảnh báo sức khỏe</div>
        <div className="text-main2 mb-3">
          Thiết lập ngưỡng cảnh báo để có thể theo dõi sức khỏe
        </div>
      </div>
      <div className="flex flex-column lg:flex-row gap-3">
        <div className="w-12 ">
          <Card
            header={
              <div className="font-bold text-xl pt-2 pl-3">
                Thiết lập cảnh báo cá nhân
              </div>
            }
          >
            <div className="flex flex-column card-1 p-3">
              <div className="font-bold text-xl mb-4">Nhịp tim</div>
              <div className="flex flex-column gap-3">
                <div>
                  <label htmlFor="ip1">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputText
                      id="ip2"
                      className="w-full pr-8"
                      value={formData.minHeartRate}
                      placeholder="Nhập giá trị nhịp tim tối thiểu"
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorMinHeartRate: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minHeartRate: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorMinHeartRate}
                      disabled={!isEdit && !first}
                    />
                    <span className="absolute mr-3">BPM</span>
                  </div>
                  {errorFormData.errorMinHeartRate && formData.minHeartRate && (
                    <small className="p-error">
                      {isNaN(formData.minHeartRate)
                        ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                        : formData.minHeartRate > 300 ||
                          formData.maxHeartRate < 30
                        ? "Giá trị nhịp tim phải nằm trong khoảng 30 - 300 BPM!"
                        : "Giá trị tối thiểu không được lớn hơn giá trị tối đa"}
                    </small>
                  )}
                </div>
                <div>
                  <label htmlFor="ip2">Giá trị tối đa</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputText
                      id="ip2"
                      className="w-full w-full pr-8"
                      placeholder="Nhập giá trị nhịp tim tối đa"
                      value={formData.maxHeartRate}
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorMaxHeartRate: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxHeartRate: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorMaxHeartRate}
                      disabled={!isEdit && !first}
                    />
                    <span className="absolute mr-3">BPM</span>
                  </div>
                </div>
                {errorFormData.errorMaxHeartRate && formData.maxHeartRate && (
                  <small className="p-error">
                    {isNaN(formData.maxHeartRate)
                      ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                      : "Giá trị nhịp tim phải nằm trong khoảng 30 - 300 BPM!"}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-column card-1 p-3 mt-5">
              <div className="font-bold text-xl mb-4">Đường huyết</div>
              <div className="flex flex-column gap-3">
                <div>
                  <label htmlFor="ip1">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputText
                      id="ip2"
                      className="w-full w-full pr-8"
                      placeholder="Nhập giá trị đường huyết tối thiểu"
                      value={formData.minBloodSugar}
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorMinBloodSugar: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minBloodSugar: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorMinBloodSugar}
                      disabled={!isEdit && !first}
                    />
                    <span className="absolute mr-3">mg/dL</span>
                  </div>
                  {errorFormData.errorMinBloodSugar &&
                    formData.minBloodSugar && (
                      <small className="p-error">
                        {isNaN(formData.minBloodSugar)
                          ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                          : formData.minBloodSugar > formData.maxBloodSugar
                          ? "Giá trị tối thiểu không được lớn hơn giá trị tối đa"
                          : "Giá trị đường huyết phải nằm trong khoảng 0 - 200 mg/dL!"}
                      </small>
                    )}
                </div>
                <div>
                  <label htmlFor="ip2">Giá trị tối đa</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputText
                      id="ip2"
                      className="w-full w-full pr-8"
                      value={formData.maxBloodSugar}
                      placeholder="Nhập giá trị đường huyết tối đa"
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorMaxBloodSugar: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxBloodSugar: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorMaxBloodSugar}
                      disabled={!isEdit && !first}
                    />
                    <span className="absolute mr-3">mg/dL</span>
                  </div>
                  {errorFormData.errorMaxBloodSugar &&
                    formData.maxBloodSugar && (
                      <small className="p-error">
                        {isNaN(formData.maxBloodSugar)
                          ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                          : "Giá trị đường huyết phải nằm trong khoảng 0 - 200 mg/dL!"}
                      </small>
                    )}
                </div>
              </div>
            </div>

            <div className="flex flex-column card-1 p-3  mt-5">
              <div className="font-bold text-xl mb-4">Giấc ngủ</div>
              <div className="flex flex-column gap-3">
                <div>
                  <label htmlFor="ip1">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputText
                      id="ip2"
                      className="w-full w-full pr-8"
                      value={formData.minSleep}
                      placeholder="Nhập giá trị giấc ngủ tối thiểu"
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorminSleep: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minSleep: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorminSleep}
                      disabled={!isEdit && !first}
                    />
                    <span className="absolute mr-3">giờ</span>
                  </div>
                  {errorFormData.errorminSleep && formData.minSleep && (
                    <small className="p-error">
                      {isNaN(formData.minSleep)
                        ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                        : "Giá trị giấc ngủ phải nằm trong khoảng 0 - 24 giờ!"}
                    </small>
                  )}
                </div>
                <div>
                  <label htmlFor="ip2">Giá trị tối đa</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputText
                      id="ip2"
                      className="w-full w-full pr-8"
                      placeholder="Nhập giá trị giấc ngủ tối đa"
                      value={formData.maxSleep}
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errormaxSleep: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxSleep: e.target.value,
                        })
                      }
                      invalid={errorFormData.errormaxSleep}
                      disabled={!isEdit && !first}
                    />
                    <span className="absolute mr-3">giờ</span>
                  </div>
                  {errorFormData.errormaxSleep && formData.maxSleep && (
                    <small className="p-error">
                      {isNaN(formData.maxSleep)
                        ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                        : "Giá trị giấc ngủ phải nằm trong khoảng 0 - 24 giờ!"}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-column card-1 p-3 mt-5">
              <div className="font-bold text-xl">Huyết áp</div>

              <div>
                <div className="font-bold text-sm mb-2 mt-2">Tâm thu</div>
                <div className="flex flex-column gap-3">
                  <div>
                    <label htmlFor="ip1">Giá trị tối thiểu</label>
                    <div className="relative flex align-items-center justify-content-end">
                      <InputText
                        id="ip2"
                        className="w-full w-full pr-8"
                        placeholder="Nhập giá trị tâm thu tối thiểu"
                        value={formData.minSystolic}
                        onFocus={() =>
                          setErrorFormData({
                            ...errorFormData,
                            errorminSystolic: false,
                          })
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            minSystolic: e.target.value,
                          })
                        }
                        invalid={errorFormData.errorminSystolic}
                        disabled={!isEdit && !first}
                      />
                      <span className="absolute mr-3">mmHg</span>
                    </div>
                    {errorFormData.errorminSystolic && formData.minSystolic && (
                      <small className="p-error">
                        {isNaN(formData.minSystolic)
                          ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                          : formData.minSystolic > 250 ||
                            formData.maxSystolic < 30
                          ? "Giá trị huyết áp tâm thu phải nằm trong khoảng 30 - 250 mmHg!"
                          : "Giá trị tối thiểu không được lớn hơn giá trị tối đa"}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="ip2">Giá trị tối đa</label>
                    <div className="relative flex align-items-center justify-content-end">
                      <InputText
                        id="ip2"
                        className="w-full w-full pr-8"
                        placeholder="Nhập giá trị tâm thu tối đa"
                        value={formData.maxSystolic}
                        onFocus={() =>
                          setErrorFormData({
                            ...errorFormData,
                            errormaxSystolic: false,
                          })
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            maxSystolic: e.target.value,
                          })
                        }
                        invalid={errorFormData.errormaxSystolic}
                        disabled={!isEdit && !first}
                      />
                      <span className="absolute mr-3">mmHg</span>
                    </div>
                    {errorFormData.errormaxSystolic && formData.maxSystolic && (
                      <small className="p-error">
                        {isNaN(formData.maxSystolic)
                          ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                          : "Giá trị huyết áp tâm thu phải nằm trong khoảng 30 - 250 mmHg!"}
                      </small>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-bold text-sm mt-2 mb-2">Tâm trương</div>
                  <div className="flex flex-column gap-3">
                    <div>
                      <label htmlFor="ip1">Giá trị tối thiểu</label>
                      <div className="relative flex align-items-center justify-content-end">
                        <InputText
                          id="ip2"
                          className="w-full w-full pr-8"
                          placeholder="Nhập giá trị tâm trương tối thiểu"
                          value={formData.minDiastolic}
                          onFocus={() =>
                            setErrorFormData({
                              ...errorFormData,
                              errorminDiastolic: false,
                            })
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              minDiastolic: e.target.value,
                            })
                          }
                          invalid={errorFormData.errorminDiastolic}
                          disabled={!isEdit && !first}
                        />
                        <span className="absolute mr-3">mmHg</span>
                      </div>
                      {errorFormData.errorminDiastolic &&
                        formData.minDiastolic && (
                          <small className="p-error">
                            {isNaN(formData.minDiastolic)
                              ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                              : formData.minDiastolic > 200 ||
                                formData.maxDiastolic < 20
                              ? "Giá trị huyết áp tâm trương phải nằm trong khoảng 20 - 200 mmHg!"
                              : "Giá trị tối thiểu không được lớn hơn giá trị tối đa"}
                          </small>
                        )}
                    </div>
                    <div>
                      <label htmlFor="ip2">Giá trị tối đa</label>
                      <div className="relative flex align-items-center justify-content-end">
                        <InputText
                          id="ip2"
                          className="w-full w-full pr-8"
                          placeholder="Nhập giá trị tâm trương tối đa"
                          value={formData.maxDiastolic}
                          onFocus={() =>
                            setErrorFormData({
                              ...errorFormData,
                              errormaxDiastolic: false,
                            })
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxDiastolic: e.target.value,
                            })
                          }
                          invalid={errorFormData.errormaxDiastolic}
                          disabled={!isEdit && !first}
                        />
                        <span className="absolute mr-3">mmHg</span>
                      </div>
                      {errorFormData.errormaxDiastolic &&
                        formData.maxDiastolic && (
                          <small className="p-error">
                            {isNaN(formData.maxDiastolic)
                              ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                              : "Giá trị huyết áp tâm trương phải nằm trong khoảng 20 - 200 mmHg!"}
                          </small>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              {first ? (
                <Button
                  icon="pi pi-save"
                  label="Lưu huyết áp"
                  className="mt-3 w-full"
                  onClick={handleButton}
                />
              ) : (
                <>
                  {isEdit ? (
                    <>
                      <Button
                        className="mr-3"
                        type="button"
                        label="Lưu thay đổi"
                        icon="pi pi-save"
                        onClick={handleButton}
                      />
                      <Button
                        type="button"
                        label="Hủy"
                        icon="pi pi-times"
                        severity="secondary"
                        onClick={handleCancel}
                      />
                    </>
                  ) : (
                    <Button
                      type="button"
                      label="Sửa"
                      icon="pi pi-pencil"
                      onClick={() => setIsEdit(true)}
                    />
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetUpAlerts;
