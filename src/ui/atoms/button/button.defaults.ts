import { IButtonProps, TButtonVariants } from './button.types';

export const variantToStylesMapper: Record<TButtonVariants, IButtonProps> = {
  primary: {
    _hover: {
      bg: 'gray.50',
      color: 'gray.900',
    },
    bg: 'gray.900',
    color: 'gray.50',
  },
  secondary: {
    _hover: {
      bg: 'gray.300',
    },
    bg: 'gray.50',
    color: 'gray.900',
  },
};
