import { FC } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@ui/atoms';

import { IInputControlProps } from './input-control.types';

export const InputControl: FC<IInputControlProps> = ({
  errorMessage,
  isDisabled,
  isRequired,
  label,
  ...inputProps
}): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <Input {...inputProps} />
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
