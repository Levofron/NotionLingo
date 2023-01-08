import { IIconButtonProps, TIconButtonVariants } from './icon-button.types';

export const variantToStylesMapper: Record<TIconButtonVariants, Partial<IIconButtonProps>> = {
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
