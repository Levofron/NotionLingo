import { Modal as ChakraModal } from '@chakra-ui/react';
import { FC } from 'react';

import { ModalProps } from './modal.types';

export const Modal: FC<ModalProps> = (props): JSX.Element => <ChakraModal {...props} />;
