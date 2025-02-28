import React, { useState } from "react";
import { Typography, Box, Card } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import TaskDetail from "./TaskDetail";
import { ITask, TaskPriority } from "@/interface/task.model";
import { ColorsBase } from "@/theme/colorBase";
import { getPriorityColor } from "@/utils/helper";

const TaskCard: React.FC<{
  task: ITask;
  isOpen: boolean;
  onOpen: (id: number) => void;
}> = ({ task, isOpen, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Card
          sx={{
            p: 1,
            width: "100%",
            minHeight: "40px",
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
            borderBottom: `3px solid ${getPriorityColor(
              task.priority ?? TaskPriority.LOW
            )}`,
            backgroundColor: isHovered ? ColorsBase.green25 : ColorsBase.white,
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => onOpen(task.id)}
        >
          <Typography sx={styleTypoTitle} variant="h3">
            {task.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={styleTypo}>
              {task.assignTo !== null ? task.assignTo : "Unassigned"}
            </Typography>
            <Typography sx={styleTypo}>
              {task.deadline ? fDate(task.deadline) : ""}
            </Typography>
          </Box>
        </Card>
        {isOpen && <TaskDetail task={task} onClose={() => onOpen(task.id)} />}
      </Box>
    </>
  );
};

const styleTypoTitle = {
  fontWeight: "500px",
  fontSize: "16px",
  lineHeight: "20px",
  letterSpace: "0px",
  wordBreak: "break-word",
  cursor: "pointer",
  color: ColorsBase.gray900,
};

const styleTypo = {
  fontWeight: "500px",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpace: "0px",
  wordBreak: "break-word",
  cursor: "pointer",
  color: ColorsBase.gray900,
};

export default TaskCard;
