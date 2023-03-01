import { TaskItem } from "@/layout/tasks/TaskItem";
import useTasksStore from "@/states/TaskStore";
import { convertToTime } from "@/utils/convert-time";
import {
  Container,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export const Tasks = () => {
  const tasks = useTasksStore((state) => state.tasks);

  React.useEffect(() => {
    useTasksStore.getState().fetchTasks();
  }, []);

  const mapTasks = () => {
    return tasks.map((task) => {
      const { timeStart, timeEnd } = task;
      const formattedTimeStart = convertToTime(timeStart);
      const formattedTimeEnd = convertToTime(timeEnd);

      return (
        <TaskItem
          key={task.id}
          id={task.id}
          time={`${formattedTimeStart} - ${formattedTimeEnd}`}
          task={task.task}
        />
      );
    });
  };

  return (
    <Container as="main" maxW="container.lg" marginTop={10}>
      <Flex alignItems="center" justifyContent="space-between">
        <Table>
          <TableCaption>Your scheduled tasks</TableCaption>
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Task</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>{mapTasks()}</Tbody>
        </Table>
      </Flex>
    </Container>
  );
};
