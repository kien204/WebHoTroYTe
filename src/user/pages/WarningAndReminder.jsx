import React from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";

const WarningAndReminder = () => {
  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 992) tableWidthPx = width - 330;
  else if (width < 1440) tableWidthPx = width - 550;
  else tableWidthPx = width;

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
          <Card style={{ width: width >= 1440 ? "100%" : `${tableWidthPx}px` }}>
            <TabView>
              <TabPanel header="Cảnh báo tự động"></TabPanel>
              <TabPanel header="Nhắc nhở định kỳ"></TabPanel>
            </TabView>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WarningAndReminder;
