import { ISliderProps } from '@ui/atoms';

export interface ISliderControlProps extends ISliderProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
