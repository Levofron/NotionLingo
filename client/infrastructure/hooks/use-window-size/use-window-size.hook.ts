import { useEventListener } from '@chakra-ui/react';
import getClientWindowSize from 'get-client-window-size';
import { useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getClientWindowSize);

  const handleResize = () => setWindowSize(getClientWindowSize());

  useEventListener('resize', handleResize);

  return windowSize;
};
