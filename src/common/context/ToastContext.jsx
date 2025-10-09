import { createContext, useRef } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toast = useRef(null);

  const showToast = (severity, summary, detail) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export const ToastContextInstance = ToastContext;
