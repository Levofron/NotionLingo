import { forwardRef, useDisclosure } from '@chakra-ui/react';
import { ForwardRefRenderFunction, useImperativeHandle, useRef } from 'react';
import Balancer from 'react-wrap-balancer';

import {
  AlertDialog,
  Button,
  Card,
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
    isConfirmLoading,
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

  const handleClose = () => !isConfirmLoading && onClose();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent as={Card} borderRadius={0} boxShadow="6px 6px 0 var(--chakra-colors-gray-900)">
        <ModalHeader fontSize="xl" textAlign="center">
          {title}
        </ModalHeader>
        <ModalBody textAlign="center">
          <Balancer ratio={0}>{description}</Balancer>
        </ModalBody>
        <ModalFooter alignItems="center" as={Flex} justifyContent="center">
          <Button
            ref={cancelRef}
            disabled={isConfirmLoading}
            mode="light"
            size={{ base: 'sm', sm: 'md' }}
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            isLoading={isConfirmLoading}
            ml={3}
            mode="dark"
            size={{ base: 'sm', sm: 'md' }}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </AlertDialog>
  );
};

export const ConfirmationModal = forwardRef(ConfirmationModalComponent);
