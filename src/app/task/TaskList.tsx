import React, { useEffect, useState } from "react";
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
import { ColorsBase } from "@/theme/colorBase";
import SearchBar from "@/components/SearchBar";

const TaskList = () => {
  const { tasks, filteredTasks, addTask, searchTasks } = useTaskContext();
  const displayedTasks = filteredTasks || tasks;

  const [showForm, setShowForm] = useState(false);
  const [filterBy, setFilterBy] = useState("");

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
    const taskId = Math.floor(Math.random() * 1000);
    const newTask: ITask = {
      id: taskId,
      name: data.name,
      description: data.description,
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      deadline: currentDateTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignTo: "Unassigned",
    };

    addTask(newTask);
    reset();
  };

  const renderTaskCards = (tasks: Array<ITask>) => {
    return tasks.map((task: ITask) => (
      <React.Fragment key={task.id}>
        <TaskCard task={task} />
      </React.Fragment>
    ));
  };

  const handleSearch = (query: string) => {
    searchTasks(query);
  };

  return (
    <Container>
      <Box mb={5} mr={1}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Box mb={5}>{/* FilterTask component */}</Box>
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
              backgroundColor: ColorsBase.blue100,
            }}
          >
            <CardContent
              sx={{ mt: "6px", display: "flex", alignItems: "center" }}
            >
              <AiOutlineFile
                style={{
                  color: ColorsBase.blue500,
                  paddingRight: "5px",
                  fontSize: "25px",
                }}
              />
              <Typography
                variant="body2"
                align="left"
                color={ColorsBase.blue500}
              >
                To Do
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", borderRadius: "8px" }}>
            {displayedTasks.length > 0 &&
              renderTaskCards(
                displayedTasks.filter((task) => task.status === TaskStatus.TODO)
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
              cursor: "pointer",
              backgroundColor: ColorsBase.green500,
            }}
            onClick={handleTaskClick}
          >
            <AiFillPlusCircle
              fontSize="large"
              style={{ color: ColorsBase.white, paddingRight: "5px" }}
            />
            <Typography variant="body2" align="center" color={ColorsBase.white}>
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
                    color="success"
                  >
                    Create Task
                  </LoadingButton>
                </Box>
              </form>
            </FormProvider>
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Card
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              mb: "10px",
              backgroundColor: ColorsBase.yellow100,
            }}
          >
            <CardContent
              sx={{ mt: "6px", display: "flex", alignItems: "center" }}
            >
              <AiOutlineFileText
                style={{
                  color: ColorsBase.yellow500,
                  paddingRight: "5px",
                  fontSize: "25px",
                }}
              />
              <Typography
                variant="body1"
                align="left"
                color={ColorsBase.yellow500}
              >
                In Progress
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", borderRadius: "8px" }}>
            {displayedTasks.length > 0 &&
              renderTaskCards(
                displayedTasks.filter(
                  (task) => task.status === TaskStatus.IN_PROGRESS
                )
              )}
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Card
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              mb: "10px",
              backgroundColor: ColorsBase.green100,
            }}
          >
            <CardContent
              sx={{
                mt: "6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlineFileDone
                style={{
                  color: ColorsBase.green500,
                  paddingRight: "5px",
                  fontSize: "25px",
                }}
              />
              <Typography
                variant="body1"
                align="left"
                color={ColorsBase.green500}
              >
                Done
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", borderRadius: "8px" }}>
            {displayedTasks.length > 0 &&
              renderTaskCards(
                displayedTasks.filter((task) => task.status === TaskStatus.DONE)
              )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default TaskList;
