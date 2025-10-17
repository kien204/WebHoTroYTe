import React from "react";

import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

import { AuthContext } from "../../common/context/AuthContext";
import { useToast } from "../../common/hooks/useToast";
import { useApi } from "../../common/hooks/useApi";
import setUpAlertsApi from "../../services/api/setUpAlertsApi";

const SetUpAlerts = () => {
  const { showToast } = useToast();
  const { user } = React.useContext(AuthContext);
  const { callApi } = useApi(showToast);

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
                    <InputNumber
                     id="ip2"
                      className="w-full"
                      inputClassName="w-full pr-7"
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                    />
                    <span className="absolute mr-3">BPM</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="ip2">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputNumber
                     id="ip2"
                      className="w-full"
                      inputClassName="w-full pr-7"
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                    />
                    <span className="absolute mr-3">BPM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-column card-1 p-3 mt-5">
              <div className="font-bold text-xl mb-4">Đường huyết</div>
              <div className="flex flex-column gap-3">
                <div>
                  <label htmlFor="ip1">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputNumber
                     id="ip2"
                      className="w-full"
                      inputClassName="w-full pr-7"
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                    />
                    <span className="absolute mr-3">mg/dL</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="ip2">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputNumber
                     id="ip2"
                      className="w-full"
                      inputClassName="w-full pr-7"
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                    />
                    <span className="absolute mr-3">mg/dL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-column card-1 p-3  mt-5">
              <div className="font-bold text-xl mb-4">Giờ ngủ</div>
              <div className="flex flex-column gap-3">
                <div>
                  <label htmlFor="ip1">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputNumber
                     id="ip2"
                      className="w-full"
                      inputClassName="w-full pr-7"
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                    />
                    <span className="absolute mr-3">giờ</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="ip2">Giá trị tối thiểu</label>
                  <div className="relative flex align-items-center justify-content-end">
                    <InputNumber
                     id="ip2"
                      className="w-full"
                      inputClassName="w-full pr-7"
                      mode="decimal"
                      minFractionDigits={0}
                      maxFractionDigits={0}
                      useGrouping={false}
                    />
                    <span className="absolute mr-3">giờ</span>
                  </div>
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
                      <InputNumber
                       id="ip2"
                        className="w-full"
                        inputClassName="w-full pr-7"
                        mode="decimal"
                        minFractionDigits={0}
                        maxFractionDigits={0}
                        useGrouping={false}
                      />
                      <span className="absolute mr-3">mmHg</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ip2">Giá trị tối thiểu</label>
                    <div className="relative flex align-items-center justify-content-end">
                      <InputNumber
                       id="ip2"
                        className="w-full"
                        inputClassName="w-full pr-7"
                        mode="decimal"
                        minFractionDigits={0}
                        maxFractionDigits={0}
                        useGrouping={false}
                      />
                      <span className="absolute mr-3">mmHg</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-bold text-sm mt-2 mb-2">Tâm trương</div>
                  <div className="flex flex-column gap-3">
                    <div>
                      <label htmlFor="ip1">Giá trị tối thiểu</label>
                      <div className="relative flex align-items-center justify-content-end">
                        <InputNumber
                         id="ip2"
                          className="w-full"
                          inputClassName="w-full pr-7"
                          mode="decimal"
                          minFractionDigits={0}
                          maxFractionDigits={0}
                          useGrouping={false}
                        />
                        <span className="absolute mr-3">mmHg</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ip2">Giá trị tối thiểu</label>
                      <div className="relative flex align-items-center justify-content-end">
                        <InputNumber
                         id="ip2"
                          className="w-full"
                          inputClassName="w-full pr-7"
                          mode="decimal"
                          minFractionDigits={0}
                          maxFractionDigits={0}
                          useGrouping={false}
                        />
                        <span className="absolute mr-3">mmHg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetUpAlerts;
