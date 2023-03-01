import { FC } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  Spinner,
} from '@ui/atoms';

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
      <FormLabel color="gray.900" mb="3px">
        {label}
        {isLoading ? <Spinner ml="5px" size="xs" /> : null}
      </FormLabel>
    ) : null}
    <Select {...selectProps} />
    {errorMessage ? (
      <FormErrorMessage height={4} lineHeight="normal" mt="3px">
        {errorMessage}
      </FormErrorMessage>
    ) : (
      <FormHelperText height={4} mt="3px" />
    )}
  </FormControl>
);
