import React, { useState } from "react";
import { DataView } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";

export default function BlogPage() {
  // Dữ liệu mẫu cho blog
  const [posts] = useState([
    {
      id: "1",
      title: "Cách nấu món ăn nhanh cho bữa sáng",
      image: "https://picsum.photos/300/200?random=1",
      summary:
        "Hướng dẫn nấu những món ăn sáng nhanh và bổ dưỡng chỉ trong 15 phút.",
      category: "Ẩm thực",
      date: "2025-09-13",
    },
    {
      id: "2",
      title: "10 mẹo chăm sóc da mùa thu",
      image: "https://picsum.photos/300/200?random=2",
      summary:
        "Các bước chăm sóc da mùa thu giúp da luôn mịn màng và khỏe mạnh.",
      category: "Sức khỏe",
      date: "2025-09-12",
    },
    {
      id: "3",
      title: "Du lịch biển hè 2025: những điểm đến hot",
      image: "https://picsum.photos/300/200?random=3",
      summary: "Top 5 bãi biển đẹp nhất Việt Nam cho kỳ nghỉ hè năm 2025.",
      category: "Du lịch",
      date: "2025-09-11",
    },
  ]);

  // Template từng bài viết
  const itemTemplate = (post, index) => (
    <div className="col-12" key={post.id}>
      <div
        className={classNames(
          "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
          { "border-top-1 surface-border": index !== 0 }
        )}
      >
        <img
          className="w-full sm:w-16rem xl:w-20rem shadow-2 border-round"
          src={post.image}
          alt={post.title}
        />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-start gap-2">
            <div className="text-2xl font-bold text-900">{post.title}</div>
            <p>{post.summary}</p>
            <div className="flex align-items-center gap-3">
              <Tag value={post.category} severity="info" />
              <span className="text-sm text-600">{post.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Template danh sách
  const listTemplate = (items) => {
    if (!items || items.length === 0) return <p>Chưa có bài viết nào.</p>;

    return (
      <div className="grid grid-nogutter">
        {items.map((post, index) => itemTemplate(post, index))}
      </div>
    );
  };

  return (
    <div className="card">
      <h2 className="text-3xl mb-4">Blog / Tin tức</h2>
      <DataView value={posts} listTemplate={listTemplate} paginator rows={2} />
    </div>
  );
}
