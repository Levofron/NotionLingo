import { forwardRef, useDisclosure } from '@chakra-ui/react';
import { ForwardRefRenderFunction, useImperativeHandle, useRef } from 'react';
import Balancer from 'react-wrap-balancer';

import {
  AlertDialog,
  Button,
  Flex,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@ui/atoms';

import { IConfirmationModalProps, IConfirmationModalRef } from './confirmation-modal.types';

const ConfirmationModalComponent: ForwardRefRenderFunction<
  IConfirmationModalRef,
  IConfirmationModalProps
> = (
  {
    cancelButtonText = 'No',
    confirmButtonText = 'Yes',
    description = 'This action cannot be undone',
    onConfirm,
    title = 'Are you sure?',
  },
  ref,
): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const cancelRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: onOpen,
      close: onClose,
    }),
    [],
  );

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalBody textAlign="center">
          <Balancer>{description}</Balancer>
        </ModalBody>
        <ModalFooter alignItems="center" as={Flex} justifyContent="center">
          <Button ref={cancelRef} mode="light" onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button ml={3} mode="dark" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </AlertDialog>
  );
};

export const ConfirmationModal = forwardRef(ConfirmationModalComponent);
