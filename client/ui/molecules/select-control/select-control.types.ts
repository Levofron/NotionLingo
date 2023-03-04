import { ISelectProps } from '@ui/atoms';

export interface ISelectControlProps extends ISelectProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
