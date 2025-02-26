"use client";

import React from "react";
import MainBody from "./MainBody";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <div className="light:bg-slate-800">
      <MainHeader />
      <MainBody />
    </div>
  );
}

export default MainLayout;
