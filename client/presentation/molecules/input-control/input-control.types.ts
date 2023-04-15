import { InputProps } from '@presentation/atoms';

export interface InputControlProps extends InputProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
