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

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState("revenue");

  // Fake Data - Revenue Chart (5 years)
  const revenueData = [
    { year: "2020", revenue: 500000, profit: 120000 },
    { year: "2021", revenue: 700000, profit: 180000 },
    { year: "2022", revenue: 850000, profit: 220000 },
    { year: "2023", revenue: 950000, profit: 250000 },
    { year: "2024", revenue: 1100000, profit: 300000 },
  ];

  const employeeData = [
    { month: "01/2023", employees: 500, newHires: 10, resignations: 5 },
    { month: "02/2023", employees: 510, newHires: 15, resignations: 5 },
    { month: "03/2023", employees: 520, newHires: 12, resignations: 2 },
    { month: "04/2023", employees: 530, newHires: 14, resignations: 4 },
    { month: "05/2023", employees: 540, newHires: 18, resignations: 8 },
    { month: "06/2023", employees: 550, newHires: 16, resignations: 6 },
    { month: "07/2023", employees: 560, newHires: 20, resignations: 10 },
    { month: "08/2023", employees: 570, newHires: 22, resignations: 12 },
    { month: "09/2023", employees: 580, newHires: 19, resignations: 9 },
    { month: "10/2023", employees: 590, newHires: 21, resignations: 10 },
    { month: "11/2023", employees: 600, newHires: 23, resignations: 13 },
    { month: "12/2023", employees: 610, newHires: 25, resignations: 15 },
    { month: "01/2024", employees: 620, newHires: 18, resignations: 8 },
    { month: "02/2024", employees: 630, newHires: 20, resignations: 9 },
    { month: "03/2024", employees: 640, newHires: 22, resignations: 10 },
    { month: "04/2024", employees: 650, newHires: 24, resignations: 12 },
    { month: "05/2024", employees: 660, newHires: 26, resignations: 14 },
    { month: "06/2024", employees: 670, newHires: 28, resignations: 16 },
    { month: "07/2024", employees: 680, newHires: 30, resignations: 18 },
    { month: "08/2024", employees: 690, newHires: 32, resignations: 20 },
    { month: "09/2024", employees: 700, newHires: 34, resignations: 22 },
    { month: "10/2024", employees: 710, newHires: 36, resignations: 24 },
    { month: "11/2024", employees: 720, newHires: 38, resignations: 26 },
    { month: "12/2024", employees: 730, newHires: 40, resignations: 28 },
  ];

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
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={3}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#82ca9d"
                strokeWidth={3}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employeeData}>
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
