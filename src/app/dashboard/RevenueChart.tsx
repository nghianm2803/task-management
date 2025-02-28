import { REVENUES } from "@/constant/data";
import { ColorsBase } from "@/theme/colorBase";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={REVENUES}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={ColorsBase.blue300}
          strokeWidth={3}
          name="Revenue"
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke={ColorsBase.green300}
          strokeWidth={3}
          name="Profit"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
