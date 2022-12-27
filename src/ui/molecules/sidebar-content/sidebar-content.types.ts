import { IconType } from 'react-icons';

import { IBoxProps } from '@ui/atoms';

export interface ISidebarContentProps extends IBoxProps {
  onClose: () => void;
}

export interface ISidebarItem {
  href: string;
  icon: IconType;
  name: string;
}
