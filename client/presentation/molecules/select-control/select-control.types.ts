import { ISelectProps } from '@presentation/atoms';

export interface ISelectControlProps extends ISelectProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
