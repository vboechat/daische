import { DeleteTaskAction } from "@/layout/tasks/task-actions/DeleteTask";
import { Text, Flex, Td, Tr } from "@chakra-ui/react";
import React from "react";

import { EditTaskAction } from "./task-actions/EditTask";

type TaskItemProps = {
  id: number;
  time: string;
  task: string;
};

export const TaskItem = ({ id, time, task }: TaskItemProps) => {
  const isTaskLong = task.length > 80;
  const shouldDisplayTaskTitle = isTaskLong ? task : undefined;
  const taskShort = isTaskLong ? task.slice(0, 80) + "..." : task;

  return (
    <Tr key={id}>
      <Td width="20%" textAlign="center">
        {time}
      </Td>
      <Td width="60%" wordBreak="break-all">
        <Text as="span" title={shouldDisplayTaskTitle}>
          {taskShort}
        </Text>
      </Td>
      <Td width="20%">
        <Flex gap={4}>
          <EditTaskAction id={id} />
          <DeleteTaskAction id={id} />
        </Flex>
      </Td>
    </Tr>
  );
};
