import React, { useState, useContext, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { ScrollPanel } from "primereact/scrollpanel";
import { useLocation } from "react-router-dom";
import chatAI from "../../assets/chatAI.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AuthContext } from "../../common/context/AuthContext";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";
import aiHelperAPI from "../../services/api/aiHelperAPI";

import "./MiniChat.css";

const ChatWidget = () => {
  const { auth, profile } = useContext(AuthContext);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast, false);

  const location = useLocation();

  const [loadingMes, setLoadingMes] = useState(false);
  const [date] = useState(null);
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: null,
      question: null,
      answer:
        "Xin chào! Tôi là trợ lý Al sức khỏe của bạn. Tôi có thể giúp bạn hiểu về các chỉ số sức khỏe, đưa ra lời khuyên về chế độ ăn uông, tập luyện và giải thích các cảnh báo. Bạn muôn hỏi gì hôm nay?",
      date: null,
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: null, // id tạm
      question: input,
      answer: null,
      date: date,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoadingMes(true);

    // Thêm placeholder trả lời ngay lập tức
    setMessages((prev) => [
      ...prev,
      {
        id: -1,
        question: null,
        answer: "Chatbot đang trả lời...",
        date: null,
      },
    ]);

    const reData = {
      tkID: auth?.id,
      question: input,
      time: userMessage.date,
    };

    try {
      const res = await callApi(() => aiHelperAPI.sendChat(reData));

      // Cập nhật câu trả lời thật thay cho placeholder
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === -1
            ? {
                ...msg,
                id: null,
                answer: res?.answer || "Không nhận được phản hồi.",
              }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === -1
            ? {
                ...msg,
                id: Date.now(),
                answer: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.",
              }
            : msg
        )
      );
    } finally {
      setLoadingMes(false);
    }
  };

  return (
    <>
      {location.pathname !== "/ai-helper" &&
        location.pathname !== "/health-profile" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/terms-of-service" &&
        location.pathname !== "/reset-password" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" &&
        location.pathname !== "/login" && (
          <div >
            {!isOpen && (
              <Button
                rounded
                severity="info"
                className="chat-toggle-btn p-0 w-auto"
                style={{ background: "none", border: "0px" }}
                onClick={() => setIsOpen(true)}
                aria-label="Mở chat AI"
              >
                <Avatar
                  image={chatAI}
                  shape="circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              </Button>
            )}
            {isOpen && (
              <Card className="chat-box shadow-6 border-round-2xl w-10 max-w-300">
                <div className="flex flex-column">
                  <div
                    className="flex flex-row p-3"
                    style={{
                      background: "linear-gradient(to right, #3255A2, #30B3B4)",
                    }}
                  >
                    <div className="mr-auto text-white text-lg">
                      Trợ lý AI xin chào
                    </div>
                    <Button
                      icon="pi pi-times"
                      className="p-0 w-auto text-lg"
                      style={{ background: "none", border: "0px" }}
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <ScrollPanel style={{ height: "300px" }} className="p-2">
                    <div className="flex flex-column gap-3 w-full">
                      {messages.map((msg, i) => (
                        <div key={i} className="flex flex-column">
                          {/* Tin nhắn của người dùng (phải) */}
                          {msg.question && (
                            <div className="flex justify-content-end align-items-start gap-2">
                              <span
                                className="p-2 border-round-3xl shadow-1 text-white"
                                style={{
                                  background: "#6D9CCB",
                                  maxWidth: "70%",
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {msg.question}
                              </span>
                              <Avatar
                                image={
                                  profile?.avatarUrl ||
                                  "https://www.w3schools.com/howto/img_avatar.png"
                                }
                                shape="circle"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )}

                          {/* Tin nhắn của chatbot (trái) */}
                          {msg.answer && (
                            <div className="flex justify-content-start align-items-start gap-2 mt-2">
                              <Avatar
                                image={chatAI}
                                shape="circle"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              />
                              <span
                                className="p-2 border-round-3xl shadow-1 text-white"
                                style={{
                                  background: "#6D9CCB",
                                  maxWidth: "70%",
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.answer}
                                </ReactMarkdown>
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef}></div>
                    </div>
                  </ScrollPanel>

                  <div className="flex align-items-center gap-2 p-3">
                    <InputTextarea
                      autoResize
                      rows={1}
                      cols={5}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Hỏi về sức khỏe của bạn..."
                      className="w-full max-h-7rem overflow-y-scroll"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !loadingMes) handleSend();
                      }}
                    />
                    <Button
                      icon="pi pi-send"
                      onClick={handleSend}
                      disabled={loadingMes}
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
    </>
  );
};
export default ChatWidget;
