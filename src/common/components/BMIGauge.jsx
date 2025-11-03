// components/BMIGauge.tsx
import React from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
} from "@mui/x-charts/Gauge";
import { Card } from "primereact/card";

const BMIGauge = ({ bmi = 20.5 }) => {
  const maxBMI = 40;

  const clampedBMI = Math.min(Math.max(bmi, 0), maxBMI);

  return (
    <div className="flex flex-column align-items-center">
      <GaugeContainer
        width={230}
        height={150}
        startAngle={-90}
        endAngle={90}
        value={bmi}
        valueMin={0}
        valueMax={maxBMI}
      >
        {/* Gradient nền phân vùng */}
        <defs>
          <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        <GaugeReferenceArc
          sx={{
            fill: "url(#bmiGradient)",
            strokeWidth: 0,
          }}
        />

        {/* Ẩn value arc mặc định */}
        <GaugeValueArc sx={{ fill: "transparent" }} />

        {/* Con trỏ tùy chỉnh - tính toán góc từ giá trị BMI */}
        <g transform="translate(130, 130)">
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={-90}
            stroke="#1f2937"
            strokeWidth={2}
            strokeLinecap="round"
            transform={`rotate(${(clampedBMI / maxBMI) * 180 - 90})`}
            style={{ transformOrigin: "0 0" }}
          />
          <circle cx={0} cy={0} r={5} fill="#1f2937" />
          <circle cx={0} cy={0} r={2.5} fill="#ffffff" />
        </g>
      </GaugeContainer>

      {/* Giá trị BMI */}
      <div className="text-center mt-2">
        <div className="text-3xl font-bold">
          {bmi.toFixed(1)}{" "}
          <span className="text-sm font-normal text-500">kg/m²</span>
        </div>
        <div className="text-base text-600 mt-1">BMI</div>
      </div>

      {/* Chú thích vùng - dạng thanh ngang theo chiều dọc */}
      <div
        className="flex flex-column gap-2 mt-4 w-full"
        style={{ maxWidth: "240px" }}
      >
        <div className="flex align-items-center gap-2 text-sm">
          <div
            className="border-round"
            style={{
              width: "32px",
              height: "3px",
              backgroundColor: "#2563eb",
            }}
          />
          <span>Thiếu cân &lt;18.5</span>
        </div>
        <div className="flex align-items-center gap-2 text-sm">
          <div
            className="border-round"
            style={{
              width: "32px",
              height: "3px",
              backgroundColor: "#10b981",
            }}
          />
          <span>Bình thường 18.5-24.9</span>
        </div>
        <div className="flex align-items-center gap-2 text-sm">
          <div
            className="border-round"
            style={{
              width: "32px",
              height: "3px",
              backgroundColor: "#fbbf24",
            }}
          />
          <span>Thừa cân 25-29.9</span>
        </div>
        <div className="flex align-items-center gap-2 text-sm">
          <div
            className="border-round"
            style={{
              width: "32px",
              height: "3px",
              backgroundColor: "#ef4444",
            }}
          />
          <span>Béo phì ≥30</span>
        </div>
      </div>
    </div>
  );
};

export default BMIGauge;
