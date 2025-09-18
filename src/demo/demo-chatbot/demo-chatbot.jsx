import React from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

function App() {
  React.useEffect(() => {
    // Khi load lần đầu sẽ gửi tin nhắn chào
    addResponseMessage("Xin chào! Tôi có thể giúp gì cho bạn?");
  }, []);

  // Xử lý khi user gửi tin nhắn
  const handleNewUserMessage = (newMessage) => {
    console.log(`Tin nhắn mới: ${newMessage}`);
    // Ví dụ: giả lập phản hồi
    addResponseMessage("Cảm ơn bạn đã nhắn tin! (demo)");
  };

  return (
    <>
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Trợ lý ảo"
          subtitle="Chat cùng chatbot"
        />
      </div>
    </>
  );
}

export default App;
