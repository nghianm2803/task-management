import React, { useRef, useState } from "react";
import { Typography, Box, Card, Avatar, Stack } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import TaskDetail from "./TaskDetail";
import { ITask, TaskPriority } from "@/interface/task.model";
import { ColorsBase } from "@/theme/colorBase";
import { getPriorityColor } from "@/utils/helper";
import { useDrag } from "react-dnd";

const TaskCard: React.FC<{
  task: ITask;
  isOpen: boolean;
  onOpen: (id: string) => void;
}> = ({ task, isOpen, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <>
      <Box ref={ref} sx={{ display: "flex", flexDirection: "column" }}>
        <Card
          sx={{
            p: 1,
            width: "100%",
            minHeight: "40px",
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
            borderTop: `1px solid ${ColorsBase.gray200}`,
            borderBottom: `3px solid ${getPriorityColor(
              task.priority ?? TaskPriority.LOW
            )}`,
            opacity: isDragging ? 0.5 : 1,
            cursor: isDragging ? "grabbing" : "grab",
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
              marginTop: "5px",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                borderRadius: "5px",
                backgroundColor: ColorsBase.gray100,
                padding: "5px",
              }}
            >
              {task.assignTo && (
                <Avatar
                  alt={task.assignTo.username}
                  src={task.assignTo.avatar}
                  sx={{ width: "30px", height: "30px" }}
                />
              )}
              <Typography sx={styleTypo}>
                {task.assignTo?.username !== undefined
                  ? task.assignTo?.username
                  : "Unassigned"}
              </Typography>
            </Stack>
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
