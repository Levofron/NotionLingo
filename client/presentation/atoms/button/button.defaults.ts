import { ButtonProps } from './button.types';

export const variantToStylesMapper: Record<ThemeMode, ButtonProps> = {
  dark: {
    _hover: {
      bg: 'transparent',
      color: 'gray.900',
      borderColor: 'gray.900',
    },
    bg: 'gray.900',
    color: 'gray.50',
    borderColor: 'gray.900',
  },
  light: {
    _hover: {
      bg: 'gray.900',
      color: 'gray.50',
      borderColor: 'gray.50',
    },
    bg: 'gray.50',
    color: 'gray.900',
    borderColor: 'gray.900',
  },
};
