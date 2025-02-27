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
import { toast } from "react-toastify";

interface TaskContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  searchTasks: (query: string) => void;
  filterTasks: (query: string) => void;
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
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const addTask = useCallback(
    (newTask: ITask) => {
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      toast.success(`Add task ${newTask.name} successful!`);

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
      toast.success(`Edit task ${editedTask.name} successful!`);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (taskToDelete: ITask) => {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      toast.success(`Delete task ${taskToDelete.name} successful!`);

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

  const filterTasks = useCallback(
    (query: string) => {
      const filtered =
        query === "All"
          ? tasks
          : tasks.filter((task: ITask) => task.priority?.includes(query));

      setFilteredTasks(filtered);
    },
    [tasks, setFilteredTasks]
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
      searchTasks,
      filterTasks,
      filteredTasks,
    }),
    [
      tasks,
      addTask,
      editTask,
      deleteTask,
      searchTasks,
      filterTasks,
      filteredTasks,
    ]
  );

  return (
    <TaskContext.Provider value={contextValue}>
      {isLoading ? <LoadingSkeleton /> : children}
    </TaskContext.Provider>
  );
}
