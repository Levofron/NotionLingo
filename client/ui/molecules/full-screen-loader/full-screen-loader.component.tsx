import { FC } from 'react';

import { Flex, Spinner } from '@ui/atoms';

import { IFullScreenLoaderProps } from './full-screen-loader.types';

export const FullScreenLoader: FC<IFullScreenLoaderProps> = ({
  children,
  ...restProps
}): JSX.Element => (
  <Flex
    alignItems="center"
    bg="gray.50"
    height="full"
    justifyContent="center"
    left={0}
    position="fixed"
    top={0}
    width="full"
    zIndex="9999"
    {...restProps}
  >
    <Spinner />
    {children}
  </Flex>
);
