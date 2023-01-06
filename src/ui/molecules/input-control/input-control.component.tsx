import { FC } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Input, Spinner } from '@ui/atoms';

import { IInputControlProps } from './input-control.types';

export const InputControl: FC<IInputControlProps> = ({
  errorMessage,
  isDisabled,
  isLoading,
  isRequired,
  label,
  ...inputProps
}): JSX.Element => (
  <FormControl
    isDisabled={isDisabled}
    isInvalid={!!errorMessage}
    isRequired={!isLoading && isRequired}
  >
    {label ? (
      <FormLabel>
        {label}
        {isLoading ? <Spinner ml="5px" size="xs" /> : null}
      </FormLabel>
    ) : null}
    <Input {...inputProps} />
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
