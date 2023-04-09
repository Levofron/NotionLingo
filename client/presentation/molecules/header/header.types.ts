import { IFlexProps } from '@presentation/atoms';

export interface IHeaderProps extends IFlexProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
