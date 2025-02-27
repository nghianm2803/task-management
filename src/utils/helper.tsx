import { TaskPriority, TaskStatus } from "@/interface/task.model";
import { ColorsBase } from "@/theme/colorBase";

export function getStatusColor(status: TaskStatus) {
  switch (status) {
    case TaskStatus.TODO:
      return ColorsBase.blue100;
    case TaskStatus.IN_PROGRESS:
      return ColorsBase.yellow100;
    case TaskStatus.DONE:
      return ColorsBase.green100;
    default:
      return ColorsBase.blue100;
  }
}

export function getPriorityColor(priority: TaskPriority) {
  switch (priority) {
    case TaskPriority.LOW:
      return ColorsBase.green200;
    case TaskPriority.MEDIUM:
      return ColorsBase.yellow200;
    case TaskPriority.HIGH:
      return ColorsBase.red200;
    default:
      return ColorsBase.green200;
  }
}
