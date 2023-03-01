import { AlertDialog } from "@/components/AlertDialog";
import useTasksStore from "@/states/TaskStore";
import { MenuItem } from "@chakra-ui/react";
import React from "react";

export const MenuClearTasksItem = () => {
  const store = useTasksStore();

  const handleClearTasks = async () => {
    await store.deleteAllTasks().then(() => store.fetchTasks());
  };

  return (
    <AlertDialog
      trigger={<MenuItem>Clear tasks</MenuItem>}
      headerMessage="Clear tasks"
      bodyMessage="Are you sure you want to clear all tasks?"
      confirmClick={handleClearTasks}
    />
  );
};
