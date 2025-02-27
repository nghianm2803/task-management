import React, { JSX, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import {
  AiOutlineClose,
  AiTwotoneDelete,
  AiOutlineFile,
  AiOutlineFileDone,
  AiOutlineFileText,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { useTaskContext } from "@/contexts/taskContext";
import { ITask, TaskPriority, TaskStatus } from "@/interface/task.model";
import DeleteTask from "./DeleteTask";
import { ColorsBase } from "@/theme/colorBase";
import { getPriorityColor, getStatusColor } from "@/utils/helper";

interface TaskDetailProps {
  onClose: () => void;
  task: ITask;
}

const TaskDetail = ({ task, onClose }: TaskDetailProps): JSX.Element => {
  const { editTask, deleteTask } = useTaskContext();
  const [detailTask, setDetailTask] = useState(task);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditingDeadline, setIsEditingDeadline] = useState(false);

  const handleInputChange = (
    field: keyof ITask,
    value: string | TaskStatus | TaskPriority
  ) => {
    if (detailTask.status === TaskStatus.DONE)
      return toast.error("Cannot edit a completed task");

    setDetailTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeadlineChange = () => {
    setIsEditingDeadline(!isEditingDeadline);
  };

  const updateTask = () => {
    editTask(detailTask);
    onClose();
  };

  const deleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteTask = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDeleteTask = async () => {
    deleteTask(detailTask);
    setOpenDeleteDialog(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "370px",
        right: 0,
        height: "calc(100vh - 65px)",
        borderRadius: "10px",
        border: "1px solid #E0E0E0",
        overflow: "hidden",
        backgroundColor: ColorsBase.green25,
        zIndex: 1,
        width: {
          xs: "100%",
          sm: "70%",
          md: "50%",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          padding: "10px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ flex: 1 }}>
            <CardContent>
              <TextField
                value={detailTask.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                fullWidth
                variant="standard"
              />
            </CardContent>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleDeleteTask}>
              <AiTwotoneDelete color={ColorsBase.red300} />
            </IconButton>
            <IconButton onClick={onClose}>
              <AiOutlineClose />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />

        <Box sx={{ padding: "20px" }}>
          <Stack direction="row" flexWrap="wrap" gap={3}>
            <Box sx={{ flex: "1 1 220px" }}>
              <Card
                sx={{
                  backgroundColor: getStatusColor(
                    detailTask.status ?? TaskStatus.TODO
                  ),
                }}
              >
                <CardContent>
                  <Typography variant="body2" color={ColorsBase.gray900}>
                    Status
                  </Typography>
                  <Select
                    value={detailTask.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value as TaskStatus)
                    }
                    fullWidth
                    variant="standard"
                    sx={{ width: "140px" }}
                  >
                    <MenuItem value="Todo">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyItems={"center"}
                        alignItems={"center"}
                      >
                        <AiOutlineFile
                          style={{
                            color: ColorsBase.blue500,
                          }}
                        />
                        <Typography>Todo</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="InProgress">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyItems={"center"}
                        alignItems={"center"}
                      >
                        <AiOutlineFileText
                          style={{
                            color: ColorsBase.yellow500,
                          }}
                        />
                        <Typography>InProgress</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="Done">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyItems={"center"}
                        alignItems={"center"}
                      >
                        <AiOutlineFileDone
                          style={{
                            color: ColorsBase.green500,
                          }}
                        />
                        <Typography>Done</Typography>
                      </Stack>
                    </MenuItem>
                  </Select>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: "1 1 220px" }}>
              <Card
                sx={{
                  backgroundColor: getPriorityColor(
                    detailTask.priority ?? TaskPriority.LOW
                  ),
                }}
              >
                <CardContent>
                  <Typography variant="body2" color={ColorsBase.gray900}>
                    Priority
                  </Typography>
                  <Select
                    value={detailTask.priority}
                    onChange={(e) =>
                      handleInputChange(
                        "priority",
                        e.target.value as TaskPriority
                      )
                    }
                    fullWidth
                    variant="standard"
                    sx={{ width: "130px" }}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: "1 1 300px" }}>
              <Card>
                <CardContent>
                  <Typography variant="body2">Deadline</Typography>
                  {isEditingDeadline ? (
                    <TextField
                      value={detailTask.deadline}
                      onChange={(e) =>
                        handleInputChange("deadline", e.target.value)
                      }
                      fullWidth
                      variant="standard"
                      type="datetime-local"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      onClick={handleDeadlineChange}
                      sx={{
                        marginTop: "10px",
                        cursor: "pointer",
                        "&:hover": {
                          color: ColorsBase.blue500,
                          fontWeight: "bold",
                        },
                      }}
                    >
                      {detailTask.deadline}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <Box sx={{ flex: "1 1 400px" }}>
            <Card>
              <CardContent>
                <Typography>Description</Typography>

                <TextField
                  multiline
                  rows={3}
                  value={detailTask.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  fullWidth
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: "1 1 250px" }}>
            <Stack direction="column" spacing={2}>
              <Card>
                <CardContent>
                  <Typography variant="body2">Assignee</Typography>
                  <TextField
                    multiline
                    value={detailTask.assignTo}
                    onChange={(e) =>
                      handleInputChange("assignTo", e.target.value)
                    }
                    fullWidth
                  />
                </CardContent>
              </Card>
              <Button variant="contained" onClick={updateTask} color="success">
                Save
              </Button>
            </Stack>
          </Box>
          <DeleteTask
            id={detailTask.id}
            openDeleteDialog={openDeleteDialog}
            deleteDialogClose={deleteDialogClose}
            onDelete={() => confirmDeleteTask()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskDetail;
