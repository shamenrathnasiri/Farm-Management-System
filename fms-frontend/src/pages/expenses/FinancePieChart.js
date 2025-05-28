import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // Tailwind green-500 and red-500 colors

const FinancePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/finance-summary")
      .then((res) => {
        const chartData = [
          { name: "Income", value: res.data.total_income },
          { name: "Expense", value: res.data.total_expense }
        ];
        setData(chartData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 transition-shadow duration-500 bg-white rounded-lg shadow-lg hover:shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Total Income vs Expense
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            isAnimationActive={true}
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="transition-opacity duration-300 cursor-pointer hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => value.toLocaleString(undefined, )}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontWeight: 'bold', fontSize: '1rem' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancePieChart;
