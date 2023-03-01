import { FC } from 'react';

import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from '@ui/atoms';

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
      <FormLabel color={mode === 'light' ? 'gray.50' : 'gray.900'} mb="3px">
        {label}
      </FormLabel>
    ) : null}
    <Textarea mode={mode} {...textareaProps} />
    {errorMessage ? (
      <FormErrorMessage height={4} lineHeight="normal" mt="3px">
        {errorMessage}
      </FormErrorMessage>
    ) : (
      <FormHelperText height={4} mt="3px" />
    )}
  </FormControl>
);
