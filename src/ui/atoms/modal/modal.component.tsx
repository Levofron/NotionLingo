import { Modal as ChakraModal } from '@chakra-ui/react';
import { FC } from 'react';

import { IModalProps } from './modal.types';

export const Modal: FC<IModalProps> = ({ children, ...restProps }): JSX.Element => (
  <ChakraModal {...restProps}>{children}</ChakraModal>
);
