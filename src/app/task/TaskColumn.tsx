import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ITask, TaskPriority, TaskStatus } from "@/interface/task.model";
import { ColorsBase } from "@/theme/colorBase";
import TaskCard from "./TaskCard";
import { useTaskContext } from "@/contexts/taskContext";
import FTextField from "@/components/form/FTextField";
import * as Yup from "yup";
import { fDeadline } from "@/utils/formatTime";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

interface ColumnProps {
  status: TaskStatus;
  title: string;
  color: string;
  Icon: React.ElementType;
  textColor: string;
  showAddButton: boolean;
  tasks: Array<ITask>;
  showForm: boolean;
  openTaskId: string | null;
}

const Column: React.FC<ColumnProps> = ({
  status,
  title,
  color,
  Icon,
  tasks,
  textColor,
  showAddButton,
}) => {
  const { addTask, editTask } = useTaskContext();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const defaultDateTime = fDeadline(new Date().toISOString());

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

  const yupSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    deadline: Yup.string().required("This field is required"),
  });

  const methods = useForm<{
    name: string;
    description: string;
    deadline: string;
  }>({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: {
    name: string;
    description: string;
    deadline: string;
  }) => {
    const taskId = uuidv4();
    const newTask: ITask = {
      id: taskId,
      name: data.name,
      description: data.description,
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      deadline: data.deadline,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignTo: undefined,
    };

    addTask(newTask);
    reset();
    setShowForm(false);
  };

  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item: ITask) => {
      if (item.status === TaskStatus.DONE && status !== TaskStatus.DONE) {
        toast.error("Cannot edit a completed task.");
        return;
      }
      if (item.status !== status) {
        editTask({ ...item, status });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  const handleOpenTask = (taskId: string) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const handleTaskClick = () => {
    setShowForm((prevState) => {
      const newState = !prevState;
      if (newState) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
      return newState;
    });
  };

  return (
    <Box
      ref={ref}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: "100%", sm: 300 },
        minHeight: "100%",
        backgroundColor: isOver && canDrop ? color : "transparent",
        transition: "background-color 0.2s ease",
        padding: 2,
        borderRadius: 1,
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
          <Icon style={{ color: textColor, paddingRight: 5, fontSize: 25 }} />
          <Typography variant="body1" align="left" color={textColor}>
            {title}
          </Typography>
        </CardContent>
      </Card>

      <Box
        sx={{ width: "100%", borderRadius: "8px", flex: 1, overflowY: "auto" }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isOpen={openTaskId === task.id}
            onOpen={handleOpenTask}
          />
        ))}
      </Box>

      {showAddButton && status === TaskStatus.TODO && (
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
            <Typography variant="body2" align="center" color={ColorsBase.white}>
              Add Task
            </Typography>
          </Card>

          {showForm && (
            <div ref={formRef} style={{ paddingBottom: 20 }}>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FTextField
                    name="name"
                    label="Task Name"
                    required
                    placeholder="Enter task name"
                    sx={{ mb: 2 }}
                  />
                  <FTextField
                    name="description"
                    label="Task Description"
                    fullWidth
                    required
                    placeholder="Enter task description"
                    sx={{ mb: 2 }}
                  />
                  <FTextField
                    name="deadline"
                    label="Deadline"
                    type="datetime-local"
                    required
                    sx={{ width: 1, mb: 2 }}
                    inputProps={{ min: defaultDateTime }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      color="success"
                    >
                      Add Task
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </div>
          )}
        </>
      )}
    </Box>
  );
};

export default Column;
