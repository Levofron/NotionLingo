import { IButtonProps, TButtonVariants } from './button.types';

export const variantToStylesMapper: Record<TButtonVariants, IButtonProps> = {
  primary: {
    _hover: {
      bg: 'white',
      color: 'black',
    },
    bg: 'black',
    color: 'white',
  },
  secondary: {
    _hover: {
      bg: 'black',
      color: 'white',
    },
    bg: 'white',
    color: 'black',
  },
};
