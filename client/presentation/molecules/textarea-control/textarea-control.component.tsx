import { FC } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from '@presentation/atoms';

import { TextareaControlProps } from './textarea-control.types';

export const TextareaControl: FC<TextareaControlProps> = ({
  errorMessage,
  isDisabled,
  isRequired,
  label,
  mode,
  ...textareaProps
}): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? (
      <FormLabel
        color={mode === 'light' ? 'gray.50' : 'gray.900'}
        fontSize={{ base: 'sm', sm: 'md' }}
        mb="3px"
      >
        {label}
      </FormLabel>
    ) : null}
    <Textarea
      fontSize={{ base: 'sm', sm: 'md' }}
      mode={mode}
      pl={{ base: 3, sm: 4 }}
      pr={{ base: 3, sm: 4 }}
      style={{ height: 115 }}
      {...textareaProps}
    />
    {errorMessage ? (
      <FormErrorMessage height={4} lineHeight="normal" mt="3px">
        {errorMessage}
      </FormErrorMessage>
    ) : (
      <FormHelperText height={4} mt="3px" />
    )}
  </FormControl>
);
