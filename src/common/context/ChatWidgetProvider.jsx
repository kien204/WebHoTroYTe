import { useState } from "react";
import ReactDOM from "react-dom";
import ChatWidget from "../components/ChatWidget";
import { ChatWidgetContext } from "./ChatWidgetContext";

export const ChatWidgetProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <ChatWidgetContext.Provider value={{ visible, setVisible }}>
      {ReactDOM.createPortal(<ChatWidget visible={visible} />, document.body)}
      {children}
    </ChatWidgetContext.Provider>
  );
};
