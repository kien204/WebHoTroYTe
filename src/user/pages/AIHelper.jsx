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
import { useToast } from "../../common/hooks/useToast";
import aiHelperAPI from "../../services/api/aiHelperAPI";

const AIHelper = () => {
  const { auth, info } = useContext(AuthContext);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast, false);

  const [loadingMes, setLoadingMes] = useState(false);
  const [history, setHistory] = useState([
    [
      {
        id: 33,
        question: "Cholera due to Vibrio cholerae 01, biovar cholerae",
        answer:
          "Mã ICD-10: **A00.0**\n\n**Tên bệnh:** Tả do Vibrio cholerae 01, biovar cholerae (Cholera due to Vibrio cholerae 01, biovar cholerae).\n\n**Thông tin chính:**\n1.  **Nguyên nhân:** Bệnh tả gây ra bởi vi khuẩn Vibrio cholerae thuộc nhóm huyết thanh O1, biovar cholerae (còn gọi là tả cổ điển).\n2.  **Triệu chứng:** Tiêu chảy cấp tính dữ dội (phân lỏng như nước vo gạo), nôn mửa, mất nước nghiêm trọng, có thể dẫn đến sốc và tử vong nếu không được điều trị kịp thời.\n3.  **Lây truyền:** Chủ yếu qua đường phân-miệng, do ăn uống thực phẩm hoặc nước bị nhiễm khuẩn.",
        date: "2025-09-11",
      },
      {
        id: 2,
        question: "Nhiễm herpesvirus khác",
        answer: "Không tìm thấy thông tin.\n",
        date: "2025-09-11",
      },
    ],
    [
      {
        id: 31,
        question: "răng ê buốt khi sử dụng đồ lạnh",
        answer:
          "Chào bạn, dưới đây là các mã ICD-10 và thông tin liên quan cho các tình trạng bạn đã nêu:\n\n**Context:**\n\n*   **Erosion of teeth:**\n    *   **Mã ICD-10:** K03.2 (Erosion of teeth)\n    *   **Thông tin chính:** Là tình trạng mất mô răng cứng do quá trình hóa học (axit) không liên quan đến vi khuẩn. Thường do axit từ thực phẩm, đồ uống hoặc trào ngược dạ dày. Dẫn đến răng nhạy cảm, đổi màu và mất men răng.\n\n*   **Dislocation of tooth:**\n    *   **Mã ICD-10:** S03.2 (Dislocation of tooth)\n    *   **Thông tin chính:** Là tình trạng răng bị lệch khỏi vị trí bình thường trong ổ răng. Thường do chấn thương (ví dụ: va đập mạnh). Có thể gây đau, chảy máu và lung lay răng.\n\n*   **Fracture of tooth:**\n    *   **Mã ICD-10:** S02.5 (Fracture of tooth)\n    *   **Thông tin chính:** Là tình trạng răng bị nứt hoặc vỡ. Thường do chấn thương, cắn vật cứng hoặc sâu răng lớn. Có thể gây đau, nhạy cảm và nguy cơ nhiễm trùng tủy.\n\n*   **Caries with pulp exposure:**\n    *   **Mã ICD-10:** K02.2 (Caries of dentin, pulp exposure)\n    *   **Thông tin chính:** Là sâu răng đã tiến triển đến mức lộ tủy răng. Gây đau dữ dội, đặc biệt khi ăn uống nóng/lạnh hoặc khi cắn. Cần điều trị tủy hoặc nhổ răng.\n\n*   **Disturbances in tooth eruption:**\n    *   **Mã ICD-10:** K00.6 (Disturbances in tooth eruption)\n    *   **Thông tin chính:** Là các vấn đề liên quan đến quá trình mọc răng, bao gồm mọc chậm, mọc lệch hoặc răng ngầm. Có thể gây đau, sưng nướu hoặc ảnh hưởng đến sự sắp xếp của các răng khác.\n\n*   **Teething syndrome:**\n    *   **Mã ICD-10:** K00.7",
        date: "2025-10-14",
      },
      {
        id: 26,
        question: "bị muỗi đốt sau đó bị ốm đã 3 ngày nhiệt độ rất cao",
        answer:
          'Dựa trên triệu chứng "bị muỗi đốt sau đó bị ốm đã 3 ngày nhiệt độ rất cao", bệnh sốt xuất huyết Dengue là một khả năng cần được xem xét.\n\n**Mã ICD-10:** A90 (Sốt xuất huyết Dengue).\n\n**Thông tin chính:**\n1.  **Nguyên nhân:** Do virus Dengue, lây truyền chủ yếu qua vết đốt của muỗi vằn (Aedes aegypti).\n2.  **Triệu chứng:** Sốt cao đột ngột (thường 39-40°C) kéo dài 2-7 ngày, kèm theo đau đầu dữ dội, đau nhức cơ khớp, buồn nôn, nôn, và có thể xuất hiện phát ban.\n3.  **Diễn biến:** Bệnh có thể diễn biến từ nhẹ đến nặng, gây sốc, xuất huyết hoặc suy tạng, thậm chí tử vong nếu không được chẩn đoán và điều trị kịp thời.\n\nBạn nên đến cơ sở y tế để được thăm khám, chẩn đoán chính xác và có hướng điều trị phù hợp.',
        date: "2025-10-14",
      },
      {
        id: 27,
        question: "bị muỗi đốt sau đó bị ốm đã 3 ngày nhiệt độ rất cao",
        answer:
          "Dựa trên các triệu chứng bạn mô tả (bị muỗi đốt, sốt cao kéo dài 3 ngày), mã ICD-10 phù hợp nhất trong ngữ cảnh này là **A90 - Sốt xuất huyết Dengue (Dengue fever)**.\n\n**Thông tin chính về mã A90:**\n\n1.  **Nguyên nhân:** Bệnh do virus Dengue gây ra, lây truyền chủ yếu qua muỗi vằn Aedes aegypti và Aedes albopictus.\n2.  **Triệu chứng điển hình:** Sốt cao đột ngột (39-40°C) kéo dài 2-7 ngày, kèm theo đau đầu dữ dội, đau hốc mắt, đau cơ khớp, buồn nôn, nôn và có thể phát ban.\n3.  **Lưu ý:** Mặc dù thường tự khỏi, nhưng cần theo dõi sát các dấu hiệu cảnh báo để phát hiện và xử lý kịp thời các trường hợp chuyển nặng.",
        date: "2025-10-14",
      },
      {
        id: 28,
        question:
          "vết thương có hiện tượng chảy mủ và tôi bị ốm từ khi vết thương chảy mủ",
        answer:
          'Chào bạn,\n\nDựa trên mô tả của bạn về "vết thương có hiện tượng chảy mủ và tôi bị ốm từ khi vết thương chảy mủ", đây là những dấu hiệu rất đáng lo ngại cho thấy vết thương có thể đã bị nhiễm trùng. Các mô tả trong ngữ cảnh bạn cung cấp chỉ là các loại vết thương hở chung chung (ví dụ: vết thương hở nhiều vùng chi dưới, vết thương hở vai) và không bao gồm mã ICD-10 cụ thể hay thông tin về tình trạng nhiễm trùng của vết thương.\n\n**Quan trọng:** Với các triệu chứng này, bạn cần đi khám bác sĩ ngay lập tức để được chẩn đoán và điều trị kịp thời, vì nhiễm trùng vết thương có thể dẫn đến các biến chứng nghiêm trọng nếu không được xử lý đúng cách.\n\nDưới đây là một số thông tin liên quan về nhiễm trùng vết thương từ các nguồn kiểm định:\n\n1.  **Dấu hiệu nhiễm trùng:** Ngoài chảy mủ và cảm thấy ốm (có thể là sốt, mệt mỏi), các dấu hiệu khác của nhiễm trùng vết thương bao gồm sưng, đỏ, nóng quanh vết thương, đau tăng lên, và có thể có mùi hôi.\n2.  **Nguyên nhân:** Chảy mủ thường là dấu hiệu của sự hiện diện của vi khuẩn và phản ứng của hệ miễn dịch cơ thể để chống lại chúng. Mủ là hỗn hợp của bạch cầu, vi khuẩn chết và mô chết.\n3.  **Biến chứng:** Nếu không được điều trị, nhiễm trùng vết thương có thể lan rộng (ví dụ: viêm mô tế bào - cellulitis), gây nhiễm trùng máu (sepsis) hoặc áp xe, đe dọa đến sức khỏe toàn thân.\n4.  **Điều trị:** Việc điều trị thường bao gồm làm sạch vết thương kỹ lưỡng, có thể cần dẫn lưu mủ, và sử dụng kháng sinh (uống hoặc tiêm) theo chỉ định của bác sĩ để loại bỏ vi khuẩn.',
        date: "2025-10-14",
      },
      {
        id: 29,
        question: "tôi ăn rau sống bị đau bụng",
        answer:
          "Chào bạn, triệu chứng đau bụng sau khi ăn rau sống của bạn có thể được mã hóa sơ bộ là:\n\n**R10.84 - Đau bụng khác và không xác định** (Other and unspecified abdominal pain)\n\n**Thông tin chính về R10.84:**\n*   Đây là mã triệu chứng, không phải chẩn đoán nguyên nhân cụ thể của bệnh.\n*   Được sử dụng khi vị trí hoặc nguyên nhân chính xác của cơn đau bụng chưa được xác định.\n*   Mã này thường yêu cầu điều tra thêm để xác định nguyên nhân gốc gây đau bụng.\n\n**Thông tin liên quan về",
        date: "2025-10-14",
      },
      {
        id: 30,
        question: "bị nước vào dẫn đến ù tai và ngửi thấy mùi hôi của tai",
        answer:
          'Dựa trên các triệu chứng "bị nước vào dẫn đến ù tai và ngửi thấy mùi hôi của tai" và các thông tin trong ngữ cảnh, tình trạng của bạn có thể liên quan đến **Viêm tai ngoài khác** và có kèm theo **Chảy dịch tai**.\n\n**Mã ICD-10:** H60.8 (Viêm tai ngoài khác)\n\n**Thông tin chính:**\n\n1.  **Đặc điểm',
        date: "2025-10-14",
      },
      {
        id: 32,
        question: "bị ốm trên 40 độ do đi mưa",
        answer:
          'Dựa trên triệu chứng "ốm trên 40 độ" và các mã trong ngữ cảnh, mã ICD-10 phù hợp nhất là:\n\n**R50.9 - Sốt, không xác định (Fever, unspecified)**\n\n**Thông tin chính về mã R50.9:**\n1.  **Mô tả:** Mã này được sử dụng khi bệnh nhân có tình trạng sốt nhưng nguyên nhân gây sốt hoặc loại sốt cụ thể chưa được xác định rõ ràng.\n2.  **Sử dụng:** Thường được dùng trong giai đoạn chẩn đoán ban đầu hoặc khi không có đủ thông tin để xác định chẩn đoán chi tiết hơn.\n3.  **Lưu ý:** Đây là một mã triệu chứng. Khi nguyên nhân gây sốt được xác định (ví dụ: viêm phổi, cúm do nhiễm virus sau khi đi mưa), mã bệnh lý cụ thể đó sẽ được ưu tiên sử dụng thay thế.\n\n*Lưu ý: Tình trạng "đi mưa" thường liên quan đến các bệnh nhiễm trùng đường hô hấp cấp tính (như cảm lạnh, cúm), nhưng ngữ cảnh bạn cung cấp không bao gồm các mã ICD-10 cho các bệnh lý này, mà chỉ có các tình trạng liên quan đến nhiệt và sốt không xác định.*',
        date: "2025-10-14",
      },
    ],
  ]);

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
    const fetchHistory = async () => {
      try {
        const res = await callApi(() => aiHelperAPI.getHistory(auth.id));
        setHistory(res.data);
      } catch {
        // 
      }
    };

    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoadingMes(true);
    setMessages((prev) => [
      ...prev,
      {
        id: null,
        question: input,
        answer: null,
        date: null,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: -1,
          question: null,
          answer: "Chatbot đang trả lời...",
          date: null,
        },
      ]);
    }, 500);

    const reData = {
      tkID: auth.id,
      question: input,
      time: null,
    };

    setInput("");

    try {
      const res = await callApi(() => aiHelperAPI.sendChat(reData));
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === -1
            ? { ...msg, id: null, answer: res.answer } // cập nhật nội dung thật
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === -1
            ? {
                ...msg,
                id: null,
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
  };

  const handleNewChat = () => {
    setInput("");
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
                          {msg.answer}
                        </span>
                      </div>
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
                className="w-full"
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
