import React, { useState, useContext, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";

import chatAI from "../../assets/chatAI.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AuthContext } from "../../common/context/AuthContext";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";
import aiHelperAPI from "../../services/api/aiHelperAPI";

const AIHelper = () => {
  const { auth, info } = useContext(AuthContext);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast, false);

  const [loadingMes, setLoadingMes] = useState(false);
  const [date, setDate] = useState(null);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      try {
        const res = await callApi(() => aiHelperAPI.getHistory(auth?.id));
        if (isMounted) setHistory(res.data.reverse());
      } catch {
        //
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [auth?.id, callApi]);

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

  const handleSelect = (item) => {
    // item là 1 nhóm tin nhắn
    setMessages(item);
    setDate(item[0].date);
  };

  const handleNewChat = () => {
    setInput("");
    setDate(null);
    setMessages([
      {
        id: null,
        question: null,
        answer:
          "Xin chào! Tôi là trợ lý AI sức khỏe của bạn. Tôi có thể giúp bạn hiểu về các chỉ số sức khỏe, đưa ra lời khuyên về chế độ ăn uống, tập luyện và giải thích các cảnh báo. Bạn muốn hỏi gì hôm nay?",
        date: null,
      },
    ]);
  };

  return (
    <div className="flex flex-column">
      <div>
        <div className="font-bold text-2xl">Trợ lý AI sức khỏe</div>
        <div className="text-main2 mb-3">
          Tư vấn sức khỏe thông minh dựa trên dữ liệu cá nhân của bạn
        </div>
      </div>

      <div className="flex flex-column lg:flex-row ">
        <div className="col-12 lg:col-3">
          <Card
            title={
              <div className="flex flex-row align-items-center">
                <div className="text-xl">Lịch sử trò chuyện</div>
                <Button
                  icon="pi pi-plus"
                  className="ml-auto p-2 align-self-center"
                  size="small"
                  onClick={handleNewChat}
                />
              </div>
            }
            className="h-full"
          >
            <div className="flex flex-column gap-3">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-content-between align-items-center border-1 border-round p-2 hover:surface-100 cursor-pointer"
                  style={{ borderColor: "#e0e0e0" }}
                  onClick={() => handleSelect(item)}
                >
                  <div className="flex flex-column w-full pr-2">
                    <div
                      className="font-medium text-sm line-clamp"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                      }}
                    >
                      {item[0].question}
                    </div>
                    <small className="text-xs text-500">{item[0].date}</small>
                  </div>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-text p-button-danger"
                    // onClick={(e) => {
                    //   e.stopPropagation(); // 👈 tránh bị click cả item
                    //   handleDelete(item);
                    // }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Khu vực Chat */}
        <div className="col-12 lg:col-9">
          <Card
            title={
              <div className="flex flex-row">
                <div>Trợ lý AI xin chào</div>
                <div className="hidden">
                  <div className="font-normal text-xs card-4 ml-3 px-2 flex align-items-center">
                    Trực tuyến
                  </div>
                  <div
                    className="ml-auto text-xs font-normal flex align-items-center hidden"
                    style={{ color: "#0083AD" }}
                  >
                    Phản hồi trong vài giây
                  </div>
                </div>
              </div>
            }
          >
            <ScrollPanel style={{ height: "350px" }} className="mb-3">
              <div className="flex flex-column gap-3 w-full">
                {messages.map((msg, i) => (
                  <div key={i} className="flex flex-column">
                    {/* Tin nhắn của người dùng (phải) */}
                    {msg.question && (
                      <div className="flex justify-content-end align-items-start gap-2">
                        <span
                          className="p-2 border-round-3xl shadow-1"
                          style={{
                            background: "#F1F1F1",
                            maxWidth: "70%",
                            wordBreak: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {msg.question}
                        </span>
                        <Avatar
                          image={
                            info?.avatarUrl ||
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
                          className="p-2 border-round-3xl shadow-1"
                          style={{
                            background: "#F1F1F1",
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

            <div className="flex align-items-center gap-2 mt-5">
              <InputTextarea
                autoResize
                rows={1}
                cols={5}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về sức khỏe của bạn..."
                className="w-full max-h-7rem overflow-y-scroll"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button
                icon="pi pi-send"
                onClick={handleSend}
                disabled={loadingMes}
              />
            </div>
          </Card>
        </div>
      </div>
      {/* FAQ */}
      <Divider />
      <div className="flex flex-column lg:flex-row">
        <div className="col-12 lg:col-4">
          <Card>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-heart text-primary"></i>
              <span>Huyết áp 135/80 có cao không?</span>
            </div>
          </Card>
        </div>
        <div className="col-12 lg:col-4">
          <Card>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-apple text-primary"></i>
              <span>Nên ăn gì để giảm cholesterol?</span>
            </div>
          </Card>
        </div>
        <div className="col-12 lg:col-4">
          <Card>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-calendar text-primary"></i>
              <span>Nên thể dục bao lâu mỗi tuần?</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIHelper;
