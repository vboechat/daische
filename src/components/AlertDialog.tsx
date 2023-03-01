import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";

type AlertDialogProps = {
  trigger: any;
  overlay?: boolean;
  headerMessage: string;
  bodyMessage: string;
  canBeUndone?: boolean;
  confirmClick: () => void;
};

export const AlertDialog = ({
  trigger,
  headerMessage,
  bodyMessage,
  confirmClick,
  overlay = true,
  canBeUndone,
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleConfirmClick = async () => {
    setIsLoading(true);
    await confirmClick();
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      {React.cloneElement(trigger, { onClick: onOpen })}
      <ChakraAlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        {overlay && <AlertDialogOverlay />}
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {headerMessage}
          </AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody>
            <Text>{bodyMessage}</Text>
            {!canBeUndone && (
              <Text as="strong">This action cannot be undone.</Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter gap={4}>
            <Button variant="outline" ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              backgroundColor="red.600"
              _hover={{ backgroundColor: "red.700" }}
              ref={cancelRef}
              onClick={handleConfirmClick}
            >
              {isLoading ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ChakraAlertDialog>
    </>
  );
};
