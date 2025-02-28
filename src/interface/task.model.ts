export interface ITask {
  id: number;
  name: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  assignTo?: IUser;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  avatar: string;
}

export enum TaskStatus {
  TODO = "Todo",
  IN_PROGRESS = "InProgress",
  DONE = "Done",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
