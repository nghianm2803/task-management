export interface ITask {
  id: string;
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
  id: string;
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
