import React, { useCallback, useState } from "react";
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
  AiOutlineFile,
  AiOutlineFileDone,
  AiOutlineFileText,
  AiOutlinePlus,
} from "react-icons/ai";
import { FormProvider, useForm } from "react-hook-form";
import FTextField from "@/components/form/FTextField";
import { ITask, TaskPriority, TaskStatus } from "@/interface/task.model";
import { useTaskContext } from "@/contexts/taskContext";
import TaskCard from "./TaskCard";
import { ColorsBase } from "@/theme/colorBase";
import SearchBar from "@/components/SearchBar";
import FilterTask from "@/components/FilterTask";

const TaskList = () => {
  const { tasks, filteredTasks, addTask, searchTasks, filterTasks } =
    useTaskContext();
  const displayedTasks = filteredTasks || tasks;

  const [showForm, setShowForm] = useState(false);
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  const handleOpenTask = (taskId: number) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const defaultDateTime = fDeadline(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  );

  const defaultValues = {
    name: "",
    description: "",
    deadline: defaultDateTime,
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
      deadline: defaultDateTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignTo: undefined,
    };

    addTask(newTask);
    reset();
  };

  const handleSearch = useCallback(
    (query: string) => {
      searchTasks(query);
    },
    [searchTasks]
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      filterTasks(value);
    },
    [filterTasks]
  );

  const renderTaskCards = (tasks: Array<ITask>) => {
    return tasks.map((task: ITask) => (
      <React.Fragment key={task.id}>
        <TaskCard
          task={task}
          isOpen={openTaskId === task.id}
          onOpen={handleOpenTask}
        />
      </React.Fragment>
    ));
  };

  return (
    <Container>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        mt={4}
        mb={4}
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
      >
        <SearchBar onSearch={handleSearch} />
        <FilterTask onFilterChange={handleFilterChange} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
      >
        {[
          {
            status: TaskStatus.TODO,
            title: "To Do",
            color: ColorsBase.blue100,
            icon: AiOutlineFile,
            textColor: ColorsBase.blue500,
            showAddButton: true,
          },
          {
            status: TaskStatus.IN_PROGRESS,
            title: "In Progress",
            color: ColorsBase.yellow100,
            icon: AiOutlineFileText,
            textColor: ColorsBase.yellow500,
          },
          {
            status: TaskStatus.DONE,
            title: "Done",
            color: ColorsBase.green100,
            icon: AiOutlineFileDone,
            textColor: ColorsBase.green500,
          },
        ].map(
          ({ status, title, color, icon: Icon, textColor, showAddButton }) => (
            <Box
              key={status}
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: 300 },
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  backgroundColor: color,
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "center", paddingTop: 3 }}
                >
                  <Icon
                    style={{ color: textColor, paddingRight: 5, fontSize: 25 }}
                  />
                  <Typography variant="body1" align="left" color={textColor}>
                    {title}
                  </Typography>
                </CardContent>
              </Card>

              <Box sx={{ width: "100%", borderRadius: "8px" }}>
                {displayedTasks.length > 0 &&
                  renderTaskCards(
                    displayedTasks.filter((task) => task.status === status)
                  )}
              </Box>

              {showAddButton && (
                <>
                  <Card
                    sx={{
                      mb: 2,
                      width: "100%",
                      height: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: ColorsBase.green500,
                    }}
                    onClick={handleTaskClick}
                  >
                    <AiOutlinePlus
                      style={{
                        color: ColorsBase.white,
                        paddingRight: 5,
                        fontSize: 25,
                      }}
                    />
                    <Typography
                      variant="body2"
                      align="center"
                      color={ColorsBase.white}
                    >
                      Add Task
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
                          sx={{ width: 1, mb: 2 }}
                          inputProps={{ min: defaultDateTime }}
                        />
                        <Box
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
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
                </>
              )}
            </Box>
          )
        )}
      </Stack>
    </Container>
  );
};

export default TaskList;
