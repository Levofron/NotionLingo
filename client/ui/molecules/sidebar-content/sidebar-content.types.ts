import { IBoxProps } from '@ui/atoms';

export interface ISidebarContentProps extends IBoxProps {
  onClose: () => void;
}

export interface ISidebarItem {
  href: string;
  name: string;
}
