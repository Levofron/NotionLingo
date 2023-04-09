import { ITextareaProps } from '@presentation/atoms';

export interface ITextareaControlProps extends ITextareaProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
}
