import { FC } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Select, Spinner } from '@ui/atoms';

import { ISelectControlProps } from './select-control.types';

export const SelectControl: FC<ISelectControlProps> = ({
  errorMessage,
  isDisabled,
  isLoading,
  isRequired,
  label,
  ...selectProps
}): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? (
      <FormLabel color="gray.900">
        {label}
        {isLoading ? <Spinner ml="5px" size="xs" /> : null}
      </FormLabel>
    ) : null}
    <Select {...selectProps} />
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
