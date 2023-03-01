import { TaskFormModal } from "@/components/TaskFormModal";
import useTasksStore from "@/states/TaskStore";
import { MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";

type TaskData = {
  timeStart: string;
  timeEnd: string;
  task: string;
};

export const MenuNewTaskItem = () => {
  const taskStore = useTasksStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const handleCreateTasks = async (data: TaskData) => {
    setIsLoading(true);
    await taskStore.createTask(data).then(() => taskStore.fetchTasks());
    setIsLoading(false);
    onClose();
    toast({
      title: "Task created",
      status: "success",
      duration: 3500,
      isClosable: true,
    });
  };

  return (
    <>
      <MenuItem onClick={onOpen}>New task</MenuItem>

      <TaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        modalHeader="Create task"
        confirmButtonText="Create"
        onCreate={handleCreateTasks}
      />
    </>
  );
};
