"use client";

import React, { useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ColorsBase } from "@/theme/colorBase";
import MainHeader from "@/layouts/MainHeader";
import { EMPLOYEES, REVENUES } from "@/constant/task";

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState("revenue");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MainHeader />
      <Typography
        variant="h5"
        sx={{ m: 2, fontWeight: "bold", color: ColorsBase.gray900 }}
      >
        Company Dashboard
      </Typography>

      <Select
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
        sx={{ m: 2, width: 300 }}
      >
        <MenuItem value="revenue">Revenue Chart</MenuItem>
        <MenuItem value="employees">Employee Growth Chart</MenuItem>
      </Select>

      <Box sx={{ width: "90%", height: 400, m: 4 }}>
        {selectedChart === "revenue" ? (
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
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EMPLOYEES}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="newHires"
                fill={ColorsBase.green300}
                name="New Hires"
              />
              <Bar
                dataKey="resignations"
                fill={ColorsBase.red300}
                name="Resignations"
              />
              <Bar
                dataKey="employees"
                fill={ColorsBase.blue300}
                name="Employees"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
