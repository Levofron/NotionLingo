import { FlexProps } from '@presentation/atoms';

export interface HeaderProps extends FlexProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
