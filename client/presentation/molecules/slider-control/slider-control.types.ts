import { ISliderProps } from '@presentation/atoms';

export interface ISliderControlProps extends ISliderProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
