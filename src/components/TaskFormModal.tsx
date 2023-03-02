import { TaskType } from "@/types/TaskType";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TaskObjectData = z.object({
  timeStart: z
    .string({ required_error: "Time start must not be empty" })
    .min(1),
  timeEnd: z.string({ required_error: "Time end must not be empty" }).min(1),
  task: z
    .string()
    .trim()
    .min(1, { message: "Task name must not be empty" })
    .max(255, { message: "Task name must be less than 255 characters" }),
});

type TaskObject = z.infer<typeof TaskObjectData>;

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: TaskObject) => Promise<void>;
  onEdit?: (data: Omit<TaskType, "userEmail">) => Promise<void>;
  modalHeader: string;
  confirmButtonText: string;
  timeStart?: string;
  timeEnd?: string;
  task?: string;
};

export const TaskFormModal = ({
  isOpen,
  onClose,
  onCreate,
  onEdit,
  modalHeader,
  confirmButtonText,
  timeStart = "00:00",
  timeEnd = "01:00",
  task,
}: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskObject>({
    resolver: zodResolver(TaskObjectData),
    defaultValues: {
      timeStart: timeStart,
      timeEnd: timeEnd,
      task: task ?? "",
    },
  });

  const handleTasks = async (data: any) => {
    if (onCreate) {
      await onCreate(data);
    }

    if (onEdit) {
      await onEdit(data);
    }
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight="bold">
          {modalHeader}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl
            as="form"
            onSubmit={handleSubmit(handleTasks)}
            isRequired
          >
            <Flex justifyContent="space-between">
              <Flex flexDirection="column">
                <FormLabel>Start time</FormLabel>
                <Input type="time" {...register("timeStart")} />
              </Flex>
              <Flex flexDirection="column">
                <FormLabel>End time</FormLabel>
                <Input type="time" {...register("timeEnd")} />
              </Flex>
            </Flex>
            <FormLabel mt={4}>Task name</FormLabel>
            <Textarea
              placeholder="Task name"
              {...register("task")}
              resize="none"
            />
          </FormControl>
          <Text color="whiteAlpha.600">{errors.task?.message}</Text>
        </ModalBody>

        <ModalFooter gap={4}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            backgroundColor="green.600"
            _hover={{ backgroundColor: "green.700" }}
            type="submit"
            onClick={handleSubmit(handleTasks)}
          >
            {isSubmitting ? <Spinner size="sm" /> : confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
