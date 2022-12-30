import { FC } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@ui/atoms';

import { ITextareaControlProps } from './textarea-control.types';

export const TextareaControl: FC<ITextareaControlProps> = ({
  errorMessage,
  isDisabled,
  isRequired,
  label,
  ...textareaProps
}): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <Textarea {...textareaProps} />
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
