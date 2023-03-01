import { AlertDialog } from "@/components/AlertDialog";
import useTasksStore from "@/states/TaskStore";
import { Button } from "@chakra-ui/react";
import React from "react";

type DeleteTaskProps = {
  id: number;
};

export const DeleteTaskAction = ({ id }: DeleteTaskProps) => {
  const store = useTasksStore();

  const handleClearTasks = async () => {
    await store.deleteTask(id).then(() => store.fetchTasks());
  };

  return (
    <>
      <AlertDialog
        trigger={
          <Button
            backgroundColor="red.600"
            _hover={{ backgroundColor: "red.700" }}
            size="md"
          >
            Delete
          </Button>
        }
        headerMessage="Delete task"
        bodyMessage="Are you sure you want to delete this task?"
        confirmClick={handleClearTasks}
      />
    </>
  );
};
