import { createContext, useContext } from "react";

export const ChatWidgetContext = createContext();

export const useLoading = () => useContext(ChatWidgetContext);
