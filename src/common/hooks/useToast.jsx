// src/hooks/useToast.jsx
import { useContext } from "react";
import { ToastContextInstance } from "../context/ToastContext";
export const useToast = () => {
  return useContext(ToastContextInstance);
};
