import { ButtonProps } from '@chakra-ui/react';

export type TButtonVariants = 'primary' | 'secondary';

export interface IButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
}
