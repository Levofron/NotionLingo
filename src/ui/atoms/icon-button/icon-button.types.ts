import { IconButtonProps } from '@chakra-ui/react';

export type TIconButtonVariants = 'primary' | 'secondary';

export interface IIconButtonProps extends Omit<IconButtonProps, 'variant'> {
  variant?: TIconButtonVariants;
}
