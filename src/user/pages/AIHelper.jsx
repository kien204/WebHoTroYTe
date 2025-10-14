import React, { useState, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";

import chatAI from "../../assets/chatAI.png";

import { AuthContext } from "../../common/context/AuthContext";
import { useApi } from "../../common/hooks/useApi";
import infoApi from "../../services/api/infoAPI";
import { useToast } from "../../common/hooks/useToast";

const AIHelper = () => {
  const { auth } = useContext(AuthContext);
  const [info, setInfo] = useState();
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);

  // useEffect(() => {
  //   if (!auth) return;

  //   const fetchInfo = async () => {
  //     try {
  //       const res = await callApi(
  //         () => infoApi.getByTaiKhoanId(auth.id),
  //         false
  //       );
  //       setInfo(res);
  //     } catch {
  //       //
  //     }
  //   };

  //   fetchInfo();
  // }, [auth?.id, auth?.check]);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Xin chào! Tôi là trợ lý AI sức khỏe của bạn. Tôi có thể giúp bạn hiểu về các chỉ số sức khỏe, đưa ra lời khuyên về chế độ ăn uống, tập luyện và giải thích các cảnh báo. Bạn muốn hỏi gì hôm nay?",
    },
  ]);
  const [input, setInput] = useState("");

  console.log(messages);

  const [history] = useState([
    { title: "Tập cao buổi sáng", date: "30/09/2025" },
    { title: "Đau đầu chóng mặt hoa mắt", date: "30/09/2025" },
    { title: "Ngủ không ngon", date: "28/09/2025" },
    { title: "Nhịp tim ổn định", date: "27/09/2025" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Chatbot đang trả lời..." },
      ]);
    }, 500);
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
                />
              </div>
            }
            className="h-full"
          >
            <div className="flex flex-column gap-3">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-content-between align-items-center border-1 border-round p-2"
                  style={{ borderColor: "#e0e0e0" }}
                >
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <small className="text-xs">{item.date}</small>
                  </div>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-text p-button-danger"
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
              <div className="flex flex-column gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    {msg.from === "bot" && (
                      <Avatar image={chatAI} shape="circle" className="mr-2" />
                    )}
                    <div
                      className={`border-round-xl p-2 ${
                        msg.from === "user" ? "bg-main3 mr-3" : "bg-main3"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.text}
                    </div>
                    {msg.from === "user" && (
                      <Avatar
                        image={
                          info?.avatarUrl ||
                          "https://www.w3schools.com/howto/img_avatar.png"
                        }
                        shape="circle"
                      />
                    )}
                  </div>
                ))}
              </div>
            </ScrollPanel>

            <div className="flex align-items-center gap-2">
              <InputText
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về sức khỏe của bạn..."
                className="w-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button icon="pi pi-send" onClick={handleSend} />
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
