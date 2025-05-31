import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#34D399", "#F87171"]; // Tailwind green-400 and red-400 colors
const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name, value
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#1F2937" // Tailwind text-gray-800
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{
        fontFamily: "sans-serif",
        fontWeight: "600",
        fontSize: 14,
        pointerEvents: "none",
        userSelect: "none",
        filter: "drop-shadow(0 0 2px rgba(255,255,255,0.85))",
      }}
    >
      <tspan x={x} dy="0" fill="#111827" style={{ fontWeight: 700, fontSize: 15 }}>
        {name}
      </tspan>
      <tspan x={x} dy="1.2em" fill="#059669" style={{ fontWeight: 700, fontSize: 14 }}>
        Rs. {value.toLocaleString()}
      </tspan>
      <tspan x={x} dy="1.2em" fill="#10B981" style={{ fontWeight: 700, fontSize: 16 }}>
        {`${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

const FinancePieChart = () => {
  const [data, setData] = useState([
    { name: "Income", value: 1 },
    { name: "Expense", value: 1 }
  ]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/finance-summary")
      .then((res) => {
        const chartData = [
          { name: "Income", value: res.data.total_income },
          { name: "Expense", value: res.data.total_expense }
        ];
        setData(chartData);
      })
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  return (
    <div className="max-w-xl p-12 mx-auto mt-10 transition-all duration-500 bg-white shadow-xl rounded-3xl hover:shadow-2xl">
      <h2 className="mb-6 text-3xl font-extrabold tracking-wide text-center text-gray-800">
        Finance Summary
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            innerRadius={60}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="transition duration-300 cursor-pointer hover:opacity-80"
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              fontSize: "0.875rem",
              color: "#1f2937",
              fontWeight: 500,
            }}
            formatter={(value) => [`Rs. ${value.toLocaleString()}`, ""]}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#4B5563"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancePieChart;
