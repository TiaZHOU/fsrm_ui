import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./ActorPresenceChart.css";
import { useAction } from "../hook/useAction";

const ActorPresenceChart = ({ data, actor }) => {
  const presenceMap = useAction(data, actor).presenceMap;

  const chartData = Array.from(presenceMap.entries()).map(([month, count]) => ({
    month: month,
    count: count,
  }));

  return (
    <div className="chart-container">
      <h1>{actor}</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" hide />
          <YAxis dataKey="month" type="category" />
          <Legend />
          <Bar
            dataKey="count"
            fill="rgba(75, 192, 192, 0.6)"
            stroke="rgba(75, 192, 192, 1)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActorPresenceChart;
