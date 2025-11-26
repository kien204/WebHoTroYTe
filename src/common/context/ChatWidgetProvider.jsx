import { useState } from "react";
import ReactDOM from "react-dom";
import ChatWidget from "../components/ChatWidget";
import { ChatWidgetContext } from "./ChatWidgetContext";

export const ChatWidgetProvider = ({ children }) => {
  const [messager, setMessager] = useState("");

  const set = (message) => {
    setMessager(message);
  };

  return (
    <ChatWidgetContext.Provider
      value={{ messager, set }}
    >
      {ReactDOM.createPortal(
        <ChatWidget messager={messager} />,
        document.body
      )}
      {children}
    </ChatWidgetContext.Provider>
  );
};
