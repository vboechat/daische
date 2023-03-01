import useTasksStore from "@/states/TaskStore";
import { MenuItem, useToast } from "@chakra-ui/react";
import React from "react";

export const MenuReloadTasksItem = () => {
  const toast = useToast();

  const handleReloadTasks = async () => {
    toast({
      title: "Reloading tasks...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });

    await useTasksStore
      .getState()
      .fetchTasks()
      .then(() => {
        toast({
          title: "Tasks reloaded",
          status: "success",
          duration: 3500,
          isClosable: true,
        });
      });
  };

  return <MenuItem onClick={handleReloadTasks}>Refresh tasks</MenuItem>;
};
