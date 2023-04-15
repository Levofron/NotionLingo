import { AlertDialog as ChakraAlertDialog } from '@chakra-ui/react';
import { FC } from 'react';

import { AlertDialogProps } from './alert-dialog.types';

export const AlertDialog: FC<AlertDialogProps> = (props): JSX.Element => (
  <ChakraAlertDialog isCentered motionPreset="slideInBottom" {...props} />
);
