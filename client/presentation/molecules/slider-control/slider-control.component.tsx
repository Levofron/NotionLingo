import { FC } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Slider, Spinner } from '@presentation/atoms';

import { SliderControlProps } from './slider-control.types';

export const SliderControl: FC<SliderControlProps> = ({
  errorMessage,
  isDisabled,
  isLoading,
  isRequired,
  label,
  ...sliderProps
}): JSX.Element => (
  <FormControl isDisabled={isDisabled} isInvalid={!!errorMessage} isRequired={isRequired}>
    {label ? (
      <FormLabel color="gray.900">
        {label}
        {isLoading ? <Spinner ml="5px" size="xs" /> : null}
      </FormLabel>
    ) : null}
    <Slider {...sliderProps} />
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
