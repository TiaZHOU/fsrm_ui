import React from "react";
import {
  LineChart,
  Line,
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
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="rgba(75, 192, 192, 1)"
            fill="rgba(75, 192, 192, 0.6)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActorPresenceChart;
