import { FC } from 'react';

import { Box, ParticlesBackground } from '@presentation/atoms';

import { ParticlesBackgroundLayoutProps } from './particles-background-layout.types';

export const ParticlesBackgroundLayout: FC<ParticlesBackgroundLayoutProps> = ({
  children,
  height,
}): JSX.Element => (
  <Box bg="gray.50" height={height} overflow="hidden" position="relative">
    <ParticlesBackground />
    {children}
  </Box>
);

export default ParticlesBackgroundLayout;
