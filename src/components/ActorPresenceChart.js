import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import "./ActorPresenceChart.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, count } = payload[0].payload;

    return (
      <div className="tooltip">
        <p>{month}</p>
        <p>Count: {count}</p>
      </div>
    );
  }

  return null;
};

const ActorPresenceChart = ({ data, actor }) => {
  const getActorMonthlyPresence = () => {
    const presenceMap = new Map();
    data.forEach((show) => {
      const { date, cast } = show;
      const month =
        new Date(date).getUTCFullYear() +
        "-" +
        (new Date(date).getUTCMonth() + 1);
      console.log(month);

      if (Object.values(cast).includes(actor)) {
        const count = presenceMap.get(month) || 0;
        presenceMap.set(month, count + 1);
      }
    });
    return presenceMap;
  };
  const presenceMap = getActorMonthlyPresence();
  const charData = Array.from(presenceMap.entries()).map(([count]) => ({
    month: new Date().toISOString().substr(0, 7),
    count: count,
  }));

  return (
    <div className="chart-container">
      <div>
        <h1>{actor} Presence Chart</h1>
      </div>
      <LineChart width={600} height={400} data={charData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" hide />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="rgba(75, 192, 192, 1)"
          fill="rgba(75, 192, 192, 0.6)"
          dot={false}
        />
        <Label value="Month" position="insideBottom" offset={-5} />
      </LineChart>
    </div>
  );
};

export default ActorPresenceChart;
