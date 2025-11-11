import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { AuthDialogContext } from "./AuthDialogContext";

export const AuthDialogProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("expired"); // "expired" | "loginRequired"

  const showDialog = (dialogType = "expired") => {
    setType(dialogType);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleLogin = () => {
    hideDialog();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AuthDialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}

      <Dialog
        header={
          type === "expired"
            ? "Phiên đăng nhập đã hết hạn"
            : "Yêu cầu đăng nhập"
        }
        visible={visible}
        onHide={hideDialog}
      >
        {type === "expired" ? (
          <p>
            Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp
            tục sử dụng hệ thống.
          </p>
        ) : (
          <p>Bạn cần đăng nhập để thực hiện thao tác này.</p>
        )}
        <div className="flex justify-content-center">
          <Button
            label="Đăng nhập"
            icon="pi pi-sign-in"
            onClick={handleLogin}
          />
        </div>
      </Dialog>
    </AuthDialogContext.Provider>
  );
};
