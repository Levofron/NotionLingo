import { FC } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@ui/atoms';

import { ITextareaControlProps } from './textarea-control.types';

export const TextareaControl: FC<ITextareaControlProps> = ({
  errorMessage,
  isDisabled,
  isRequired,
  label,
  mode,
  ...textareaProps
}): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? (
      <FormLabel color={mode === 'light' ? 'gray.50' : 'gray.900'}>{label}</FormLabel>
    ) : null}
    <Textarea mode={mode} {...textareaProps} />
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
