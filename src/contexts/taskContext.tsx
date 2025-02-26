"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { ITask } from "../interface/task.model";
import { TASKS } from "../constant/task";

interface TaskContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  closeToast: () => void;
  searchTasks: (query: string) => void;
  filteredTasks: ITask[];
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function useTaskContext(): TaskContextProps {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const openToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const closeToast = () => {
    setShowToast(false);
    setToastMessage("");
  };

  const addTask = useCallback(
    (newTask: ITask) => {
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      openToast();
      const message = `Add task ${newTask.name} successful!`;
      setToastMessage(message);

      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
    [tasks]
  );

  const editTask = useCallback(
    (editedTask: ITask) => {
      const updatedTasks = tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      setTasks(updatedTasks);
      openToast();
      const message = `Edit task ${editedTask.name} successful!`;
      setToastMessage(message);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (taskToDelete: ITask) => {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      openToast();
      const message = `Delete task ${taskToDelete.name} successful!`;
      setToastMessage(message);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
    [tasks]
  );

  const searchTasks = useCallback(
    (query: string) => {
      const formattedQuery = query.trim().toLowerCase();
      const filtered = tasks.filter((task: ITask) =>
        task.name.toLowerCase().includes(formattedQuery)
      );
      setFilteredTasks(filtered);
    },
    [tasks]
  );

  useEffect(() => {
    const loadTasksFromLocalStorage = () => {
      try {
        const storedTasksString = localStorage.getItem("tasks");
        if (storedTasksString) {
          const storedTasks = JSON.parse(storedTasksString) as ITask[];
          setTasks(storedTasks);
          setFilteredTasks(storedTasks);
        } else {
          setTasks(TASKS);
          setFilteredTasks(TASKS);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting tasks from localStorage:", error);
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      loadTasksFromLocalStorage();
    }
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const contextValue = useMemo(
    () => ({
      tasks,
      addTask,
      editTask,
      deleteTask,
      toastMessage,
      setToastMessage,
      showToast,
      setShowToast,
      closeToast,
      searchTasks,
      filteredTasks,
    }),
    [
      tasks,
      addTask,
      editTask,
      deleteTask,
      toastMessage,
      showToast,
      searchTasks,
      filteredTasks,
    ]
  );

  return (
    <TaskContext.Provider value={contextValue}>
      {isLoading ? <LoadingSkeleton /> : children}
    </TaskContext.Provider>
  );
}
