import { SelectProps } from '@presentation/atoms';

export interface SelectControlProps extends SelectProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
