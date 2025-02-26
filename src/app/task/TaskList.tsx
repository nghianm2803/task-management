import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fDeadline } from "../../utils/formatTime";
import {
  Card,
  Typography,
  Box,
  CardContent,
  Stack,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./taskstyle.css";
import {
  AiFillPlusCircle,
  AiOutlineFile,
  AiOutlineFileDone,
  AiOutlineFileText,
} from "react-icons/ai";
import { FormProvider, useForm } from "react-hook-form";
import FTextField from "@/components/form/FTextField";
import { ITask, TaskPriority, TaskStatus } from "@/interface/task.model";
import { useTaskContext } from "@/contexts/taskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, filteredTasks, addTask } = useTaskContext();

  const displayedBooks = filteredTasks || tasks;

  const [showForm, setShowForm] = useState(false);

  const currentDateTime = fDeadline(new Date().toISOString());

  const defaultValues = {
    name: "",
    description: "",
    deadline: currentDateTime,
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assignTo: "",
  };

  const handleTaskClick = () => {
    setShowForm((prevState) => !prevState);
  };

  const yupSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
  });

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: { name: string; description: string }) => {
    // use uuid for unique id
    const bookId = Math.floor(Math.random() * 1000);
    const newTask: ITask = {
      id: bookId,
      name: data.name,
      description: data.description,
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      deadline: currentDateTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignTo: "",
    };

    addTask(newTask);
    reset();
  };

  const renderTaskCards = (tasks: Array<ITask>) => {
    return tasks.map((task: ITask, index: number) => (
      <React.Fragment key={index}>
        <TaskCard task={task} />
      </React.Fragment>
    ));
  };

  return (
    <Container>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Card
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AiOutlineFile
                style={{
                  color: "#3F51B5",
                  paddingRight: "5px",
                  fontSize: "25px",
                }}
              />
              <Typography variant="body1" align="left" color="#637381">
                To Do
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", borderRadius: "8px" }}>
            {displayedBooks.length > 0 &&
              renderTaskCards(
                displayedBooks.filter((task) => task.status === TaskStatus.TODO)
              )}
          </Box>

          <Card
            sx={{
              mb: "10px",
              width: "100%",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF",
              cursor: "pointer",
            }}
            onClick={handleTaskClick}
          >
            <AiFillPlusCircle fontSize="large" style={{ color: "#212B36" }} />
            <Typography variant="body2" align="center" color="#212B36">
              Task
            </Typography>
          </Card>

          {showForm && (
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FTextField
                  name="name"
                  fullWidth
                  required
                  placeholder="Task's name"
                />
                <FTextField
                  name="description"
                  fullWidth
                  required
                  placeholder="Task's description"
                />
                <FTextField
                  type="datetime-local"
                  name="deadline"
                  sx={{ width: 1, mb: "20px" }}
                  inputProps={{ min: currentDateTime }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting}
                  >
                    Create Task
                  </LoadingButton>
                </Box>
              </form>
            </FormProvider>
          )}
        </Box>

        {/* In Progress Column */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Card
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AiOutlineFileText
                style={{
                  color: "#F1C93B",
                  paddingRight: "5px",
                  fontSize: "25px",
                }}
              />
              <Typography variant="body1" align="left" color="#637381">
                In Progress
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", borderRadius: "8px" }}>
            {displayedBooks.length > 0 &&
              renderTaskCards(
                displayedBooks.filter(
                  (task) => task.status === TaskStatus.IN_PROGRESS
                )
              )}
          </Box>
        </Box>

        {/* Done Column */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Card
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AiOutlineFileDone
                style={{
                  color: "#8BC34A",
                  paddingRight: "5px",
                  fontSize: "25px",
                }}
              />
              <Typography variant="body1" align="left" color="#637381">
                Done
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", borderRadius: "8px" }}>
            {displayedBooks.length > 0 &&
              renderTaskCards(
                displayedBooks.filter((task) => task.status === TaskStatus.DONE)
              )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default TaskList;
