"use client";

import React from "react";
import MainBody from "./MainBody";
import MainHeader from "./MainHeader";
import AlertMsg from "@/components/AlertMsg";

function MainLayout() {
  return (
    <div className="light:bg-slate-800">
      <MainHeader />
      <AlertMsg />
      <MainBody />
    </div>
  );
}

export default MainLayout;
