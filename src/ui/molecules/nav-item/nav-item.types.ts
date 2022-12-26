import { FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface INavItemProps extends FlexProps {
  children: string;
  href: string;
  icon: IconType;
}
