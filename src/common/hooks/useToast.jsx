// src/hooks/useToast.jsx
import { useContext } from "react";
import { ToastContextInstance } from "../../services/ToastContext"; 
export const useToast = () => {
  return useContext(ToastContextInstance);
};
