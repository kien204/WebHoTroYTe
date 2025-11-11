// 📄 src/common/context/AuthDialogContext.js
import { createContext, useContext } from "react";

export const AuthDialogContext = createContext(null);

export const useAuthDialog = () => useContext(AuthDialogContext);
