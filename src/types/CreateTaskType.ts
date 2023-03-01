import { TaskType } from "@/types/TaskType";

export type CreateTaskType = Omit<TaskType, "id" | "userEmail">;
