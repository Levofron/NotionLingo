import { SliderProps } from '@presentation/atoms';

export interface SliderControlProps extends SliderProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
