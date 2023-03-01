import { api } from "@/lib/axios";
import { CreateTaskType } from "@/types/CreateTaskType";
import { TaskType } from "@/types/TaskType";
import { create } from "zustand";

type State = {
  tasks: TaskType[];
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskType) => Promise<void>;
  updateTask: (task: Omit<TaskType, "userEmail">) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  deleteAllTasks: () => Promise<void>;
};

const useTasksStore = create<State>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    await api.get("/tasks").then((res) => {
      set({ tasks: res.data });
    });
  },

  createTask: async (task: CreateTaskType) => {
    await api.post("/tasks", task);
  },

  updateTask: async (task: Omit<TaskType, "userEmail">) => {
    await api.patch(`/tasks/${task.id}`, task);
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },

  deleteAllTasks: async () => {
    await api.delete("/tasks");
  },
}));

export default useTasksStore;
