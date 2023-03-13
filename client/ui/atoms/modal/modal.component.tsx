import { Modal as ChakraModal } from '@chakra-ui/react';
import { FC } from 'react';

import { IModalProps } from './modal.types';

export const Modal: FC<IModalProps> = (props): JSX.Element => <ChakraModal {...props} />;

export default Modal;
