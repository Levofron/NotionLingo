import { TextareaProps as ChakraTextareaProps } from '@presentation/atoms';

export interface TextareaControlProps extends ChakraTextareaProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
}
