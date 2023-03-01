import { TaskFormModal } from "@/components/TaskFormModal";
import { api } from "@/lib/axios";
import useTasksStore from "@/states/TaskStore";
import { convertToTime } from "@/utils/convert-time";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";

type TaskData = {
  timeStart: string;
  timeEnd: string;
  task: string;
};

type EditTaskActionProps = {
  id: number;
};

export const EditTaskAction = ({ id }: EditTaskActionProps) => {
  const [task, setTask] = React.useState<TaskData>();
  const taskStore = useTasksStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalKey, setModalKey] = React.useState<number>(0);
  const toast = useToast();

  const handleTasks = async (data: TaskData) => {
    setIsLoading(true);
    await taskStore
      .updateTask({
        id,
        ...data,
      })
      .then(() => {
        taskStore.fetchTasks();
        setTask(data);
      });
    setIsLoading(false);
    onClose();
    toast({
      title: "Task edited successfully",
      status: "success",
      duration: 3500,
      isClosable: true,
    });
  };

  React.useEffect(() => {
    api.get(`/tasks/${id}`).then((res) => {
      const { task, timeStart, timeEnd } = res.data;

      setTask({
        task,
        timeStart: convertToTime(timeStart),
        timeEnd: convertToTime(timeEnd),
      });
    });
    setModalKey((prev) => prev + 1);
  }, [id, taskStore.tasks]);

  return (
    <>
      <Button
        backgroundColor="yellow.600"
        _hover={{ backgroundColor: "yellow.700" }}
        size="md"
        onClick={onOpen}
      >
        Edit
      </Button>

      {task && (
        <TaskFormModal
          key={modalKey}
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading}
          modalHeader="Edit task"
          confirmButtonText="Edit"
          onEdit={handleTasks}
          timeStart={task?.timeStart}
          timeEnd={task?.timeEnd}
          task={task?.task}
        />
      )}
    </>
  );
};
