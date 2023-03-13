import { FC } from 'react';

import { Box, ParticlesBackground } from '@ui/atoms';

import { IParticlesBackgroundLayoutProps } from './particles-background-layout.types';

export const ParticlesBackgroundLayout: FC<IParticlesBackgroundLayoutProps> = ({
  children,
  height,
}): JSX.Element => (
  <Box bg="gray.50" height={height} overflow="hidden" position="relative">
    <ParticlesBackground />
    {children}
  </Box>
);

export default ParticlesBackgroundLayout;
