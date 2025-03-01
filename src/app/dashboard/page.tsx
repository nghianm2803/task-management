"use client";

import React, { useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { ColorsBase } from "@/theme/colorBase";
import MainHeader from "@/layouts/MainHeader";
import RevenueChart from "./RevenueChart";
import EmployeeChart from "./EmployeeChart";

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
        {selectedChart === "revenue" ? <RevenueChart /> : <EmployeeChart />}
      </Box>
    </div>
  );
};

export default Dashboard;
