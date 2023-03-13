import { IFlexProps } from '@ui/atoms';

export interface IHeaderProps extends IFlexProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
