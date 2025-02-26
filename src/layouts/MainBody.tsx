"use client";

import React from "react";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/app/task/TaskList";

function MainBody() {
  const handleSearch = () => {};

  return (
    <>
      <div className="flex justify-between m-8 px-20 pt-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <TaskList />
    </>
  );
}

export default MainBody;
