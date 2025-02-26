export interface ITask {
  id: number;
  name: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  assignTo?: string;
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
