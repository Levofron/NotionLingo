import { AlertDialog as ChakraAlertDialog } from '@chakra-ui/react';
import { FC } from 'react';

import { IAlertDialogProps } from './alert-dialog.types';

export const AlertDialog: FC<IAlertDialogProps> = (props): JSX.Element => (
  <ChakraAlertDialog isCentered motionPreset="slideInBottom" {...props} />
);
