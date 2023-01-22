import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { ISliderProps } from './slider.types';

const SliderComponent: ForwardRefRenderFunction<HTMLDivElement, ISliderProps> = (
  { children, onChange, value, ...restProps },
  ref,
): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (newValue: number): void => {
    setShowTooltip(true);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <ChakraSlider
      ref={ref}
      onChange={handleChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...restProps}
    >
      <SliderTrack bg="gray.50" border="1px solid" borderColor="gray.900" borderRadius={0}>
        <SliderFilledTrack bg="gray.900" />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="gray.900"
        color="gray.50"
        isOpen={showTooltip}
        label={value}
        placement="top"
      >
        <SliderThumb bg="gray.900" borderRadius={0} />
      </Tooltip>
      {children}
    </ChakraSlider>
  );
};

export const Slider = forwardRef(SliderComponent);
