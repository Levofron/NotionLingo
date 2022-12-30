import { ITextareaProps } from '@ui/atoms';

export interface ITextareaControlProps extends ITextareaProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
}
