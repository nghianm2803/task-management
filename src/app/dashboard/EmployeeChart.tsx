import { EMPLOYEES } from "@/constant/data";
import { ColorsBase } from "@/theme/colorBase";
import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const EmployeeChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={EMPLOYEES}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="newHires" fill={ColorsBase.green300} name="New Hires" />
        <Bar
          dataKey="resignations"
          fill={ColorsBase.red300}
          name="Resignations"
        />
        <Bar dataKey="employees" fill={ColorsBase.blue300} name="Employees" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmployeeChart;
