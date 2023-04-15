import { BoxProps } from '@presentation/atoms';

export interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

export interface SidebarItem {
  href: string;
  name: string;
}
