import { ForwardRefRenderFunction, forwardRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
} from '@presentation/atoms';

import { IInputControlProps } from './input-control.types';

const InputControlComponent: ForwardRefRenderFunction<HTMLInputElement, IInputControlProps> = (
  { errorMessage, isDisabled, isLoading, isRequired, label, mode, ...inputProps },
  ref,
): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? (
      <FormLabel
        color={mode === 'light' ? 'gray.50' : 'gray.900'}
        fontSize={{ base: 'sm', sm: 'md' }}
        mb="3px"
      >
        {label}
        {isLoading ? <Spinner ml="5px" size="xs" /> : null}
      </FormLabel>
    ) : null}
    <Input ref={ref} mode={mode} size={{ base: 'sm', sm: 'md' }} {...inputProps} />
    {errorMessage ? (
      <FormErrorMessage height={4} lineHeight="normal" mt="3px">
        {errorMessage}
      </FormErrorMessage>
    ) : (
      <FormHelperText height={4} mt="3px" />
    )}
  </FormControl>
);

export const InputControl = forwardRef(InputControlComponent);
