import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo, useState } from 'react';

import { ISliderProps } from './slider.types';

const SliderComponent: ForwardRefRenderFunction<HTMLDivElement, ISliderProps> = (
  { children, onChange, value, ...restProps },
  ref,
): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (newValue: number) => {
    setShowTooltip(true);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleMouseEnter = () => setShowTooltip(true);

  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <ChakraSlider
      ref={ref}
      value={value}
      onChange={handleChange}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      <SliderTrack bg="gray.50" border="1px solid" borderColor="gray.900" borderRadius={10}>
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
        <SliderThumb bg="gray.900" borderRadius={10} />
      </Tooltip>
      {children}
    </ChakraSlider>
  );
};

export const Slider = memo(forwardRef(SliderComponent));
