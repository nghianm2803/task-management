import React, { useState } from "react";
import { Typography, Box, Card, Stack } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import TaskDetail from "./TaskDetail";
import { ITask, TaskPriority } from "@/interface/task.model";
import { ColorsBase } from "@/theme/colorBase";
import { getPriorityColor } from "@/utils/helper";

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleTaskClick = () => {
    setShowDetail(!showDetail);
  };

  const handleCloseForm = () => {
    setShowDetail(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          sx={{
            p: 1,
            width: "100%",
            minHeight: "40px",
            height: "auto",
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
            borderBottom: `2px solid ${getPriorityColor(
              task.priority ?? TaskPriority.LOW
            )}`,
            backgroundColor: isHovered ? ColorsBase.green25 : ColorsBase.white,
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleTaskClick}
        >
          <Typography sx={styleTypoTitle} variant="h3">
            {task.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={styleTypo}>
                {task.assignTo !== null ? task.assignTo : "Unassigned"}
              </Typography>
            </Stack>
            <Typography sx={styleTypo}>
              {task.deadline ? fDate(task.deadline) : ""}
            </Typography>
          </Box>
        </Card>
        {showDetail && <TaskDetail task={task} onClose={handleCloseForm} />}
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
  color: "#212B36",
};

export default TaskCard;
