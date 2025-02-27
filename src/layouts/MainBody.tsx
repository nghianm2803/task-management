"use client";

import React, { JSX } from "react";
import TaskList from "@/app/task/TaskList";
import { useTaskContext } from "@/contexts/taskContext";
import Toast from "@/app/task/Toast";

function MainBody(): JSX.Element {
  const { showToast } = useTaskContext();

  return (
    <>
      <TaskList />
      {showToast && <Toast />}
    </>
  );
}

export default MainBody;
