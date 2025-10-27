import React, { useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { AuthContext } from "../../common/context/AuthContext";
import { useToast } from "../../common/hooks/useToast";
import { useApi } from "../../common/hooks/useApi";
import setUpAlertsApi from "../../services/api/setUpAlertsApi";

const SetUpAlerts = () => {
  const { showToast } = useToast();
  const { user } = React.useContext(AuthContext);
  const { callApi } = useApi(showToast);

  const [formData, setFormData] = useState({
    minHeartRate: "",
    maxHeartRate: "",
    minBloodSugar: "",
    maxBloodSugar: "",
    minSleepHours: "",
    maxSleepHours: "",
    minSystolicBP: "",
    maxSystolicBP: "",
    minDiastolicBP: "",
    maxDiastolicBP: "",
  });

  const [errorFormData, setErrorFormData] = useState({
    errorMinHeartRate: false,
    errorMaxHeartRate: false,
    errorMinBloodSugar: false,
    errorMaxBloodSugar: false,
    errorMinSleepHours: false,
    errorMaxSleepHours: false,
    errorMinSystolicBP: false,
    errorMaxSystolicBP: false,
    errorMinDiastolicBP: false,
    errorMaxDiastolicBP: false,
  });

  const checkMinHeart = () => {
    if (!formData.minHeartRate) return true;
    if (isNaN(formData.minHeartRate)) return true;
    if (formData.minHeartRate < 30) return true;
    if (formData.minHeartRate > 300) return true;
    if (formData.maxHeartRate && formData.minHeartRate > formData.maxHeartRate)
      return true;
  };

  const checkMaxHeart = () => {
    if (!formData.maxHeartRate) return true;
    if (isNaN(formData.maxHeartRate)) return true;
    if (formData.maxHeartRate < 30) return true;
    if (formData.maxHeartRate > 300) return true;
  };

  const checkMinBlood = () => {
    if (!formData.minBloodSugar) return true;
    if (isNaN(formData.minBloodSugar)) return true;
    if (formData.minBloodSugar < 0) return true;
    if (formData.minBloodSugar > 200) return true;
    if (
      formData.maxBloodSugar &&
      formData.minBloodSugar > formData.maxBloodSugar
    )
      return true;
  };

  const checkMaxBlood = () => {
    if (!formData.maxBloodSugar) return true;
    if (isNaN(formData.maxBloodSugar)) return true;
    if (formData.maxBloodSugar < 0) return true;
    if (formData.maxBloodSugar > 200) return true;
  };

  const checkMinSleep = () => {
    if (!formData.minSleepHours) return true;
    if (isNaN(formData.minSleepHours)) return true;
    if (formData.minSleepHours < 0) return true;
    if (formData.minSleepHours > 24) return true;
  };

  const checkMaxSleep = () => {
    if (!formData.maxSleepHours) return true;
    if (isNaN(formData.maxSleepHours)) return true;
    if (formData.maxSleepHours < 0) return true;
    if (formData.maxSleepHours > 24) return true;
  };

  const checkMinSystolic = () => {
    if (!formData.minSystolicBP) return true;
    if (isNaN(formData.minSystolicBP)) return true;
    if (formData.minSystolicBP < 30) return true;
    if (formData.minSystolicBP > 250) return true;
    if (
      formData.maxSystolicBP &&
      formData.minSystolicBP > formData.maxSystolicBP
    )
      return true;
  };

  const checkMaxSystolic = () => {
    if (!formData.maxSystolicBP) return true;
    if (isNaN(formData.maxSystolicBP)) return true;
    if (formData.maxSystolicBP < 30) return true;
    if (formData.maxSystolicBP > 250) return true;
  };

  const checkMinDiastolic = () => {
    if (!formData.minDiastolicBP) return true;
    if (isNaN(formData.minDiastolicBP)) return true;
    if (formData.minDiastolicBP < 20) return true;
    if (formData.minDiastolicBP > 200) return true;
    if (
      formData.maxDiastolicBP &&
      formData.minDiastolicBP > formData.maxDiastolicBP
    )
      return true;
  };

  const checkMaxDiastolic = () => {
    if (!formData.maxDiastolicBP) return true;
    if (isNaN(formData.maxDiastolicBP)) return true;
    if (formData.maxDiastolicBP < 20) return true;
    if (formData.maxDiastolicBP > 200) return true;
  };

  const handleButton = () => {
    const newError = {
      errorMinHeartRate: checkMinHeart(),
      errorMaxHeartRate: checkMaxHeart(),
      errorMinBloodSugar: checkMinBlood(),
      errorMaxBloodSugar: checkMaxBlood(),
      errorMinSleepHours: checkMinSleep(),
      errorMaxSleepHours: checkMaxSleep(),
      errorMinSystolicBP: checkMinSystolic(),
      errorMaxSystolicBP: checkMaxSystolic(),
      errorMinDiastolicBP: checkMinDiastolic(),
      errorMaxDiastolicBP: checkMaxDiastolic(),
    };
    setErrorFormData(newError);
    if (Object.values(newError).some((value) => value === true)) return;

    console.log(formData);
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
                      className="w-full w-full pr-8"
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
                      value={formData.minSleepHours}
                      placeholder="Nhập giá trị giấc ngủ tối thiểu"
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorMinSleepHours: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minSleepHours: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorMinSleepHours}
                    />
                    <span className="absolute mr-3">giờ</span>
                  </div>
                  {errorFormData.errorMinSleepHours &&
                    formData.minSleepHours && (
                      <small className="p-error">
                        {isNaN(formData.minSleepHours)
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
                      value={formData.maxSleepHours}
                      onFocus={() =>
                        setErrorFormData({
                          ...errorFormData,
                          errorMaxSleepHours: false,
                        })
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxSleepHours: e.target.value,
                        })
                      }
                      invalid={errorFormData.errorMaxSleepHours}
                    />
                    <span className="absolute mr-3">giờ</span>
                  </div>
                  {errorFormData.errorMaxSleepHours &&
                    formData.maxSleepHours && (
                      <small className="p-error">
                        {isNaN(formData.maxSleepHours)
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
                        value={formData.minSystolicBP}
                        onFocus={() =>
                          setErrorFormData({
                            ...errorFormData,
                            errorMinSystolicBP: false,
                          })
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            minSystolicBP: e.target.value,
                          })
                        }
                        invalid={errorFormData.errorMinSystolicBP}
                      />
                      <span className="absolute mr-3">mmHg</span>
                    </div>
                    {errorFormData.errorMinSystolicBP &&
                      formData.minSystolicBP && (
                        <small className="p-error">
                          {isNaN(formData.minSystolicBP)
                            ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                            : formData.minSystolicBP > 250 ||
                              formData.maxSystolicBP < 30
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
                        value={formData.maxSystolicBP}
                        onFocus={() =>
                          setErrorFormData({
                            ...errorFormData,
                            errorMaxSystolicBP: false,
                          })
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            maxSystolicBP: e.target.value,
                          })
                        }
                        invalid={errorFormData.errorMaxSystolicBP}
                      />
                      <span className="absolute mr-3">mmHg</span>
                    </div>
                    {errorFormData.errorMaxSystolicBP &&
                      formData.maxSystolicBP && (
                        <small className="p-error">
                          {isNaN(formData.maxSystolicBP)
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
                          value={formData.minDiastolicBP}
                          onFocus={() =>
                            setErrorFormData({
                              ...errorFormData,
                              errorMinDiastolicBP: false,
                            })
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              minDiastolicBP: e.target.value,
                            })
                          }
                          invalid={errorFormData.errorMinDiastolicBP}
                        />
                        <span className="absolute mr-3">mmHg</span>
                      </div>
                      {errorFormData.errorMinDiastolicBP &&
                        formData.minDiastolicBP && (
                          <small className="p-error">
                            {isNaN(formData.minDiastolicBP)
                              ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                              : formData.minDiastolicBP > 200 ||
                                formData.maxDiastolicBP < 20
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
                          value={formData.maxDiastolicBP}
                          onFocus={() =>
                            setErrorFormData({
                              ...errorFormData,
                              errorMaxDiastolicBP: false,
                            })
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxDiastolicBP: e.target.value,
                            })
                          }
                          invalid={errorFormData.errorMaxDiastolicBP}
                        />
                        <span className="absolute mr-3">mmHg</span>
                      </div>
                      {errorFormData.errorMaxSystolicBP &&
                        formData.maxDiastolicBP && (
                          <small className="p-error">
                            {isNaN(formData.maxDiastolicBP)
                              ? "Giá trị phải là số nguyên dương! Vui lòng nhập lại!"
                              : "Giá trị huyết áp tâm trương phải nằm trong khoảng 20 - 200 mmHg!"}
                          </small>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              icon="pi pi-save"
              className="mt-5"
              label="Lưu thay đổi"
              onClick={handleButton}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetUpAlerts;
