import { FC } from 'react';

import { Flex, Spinner } from '@ui/atoms';

export const FullScreenLoader: FC = (): JSX.Element => (
  <Flex
    alignItems="center"
    bg="white"
    height="full"
    justifyContent="center"
    left={0}
    position="fixed"
    top={0}
    width="full"
    zIndex="9999"
  >
    <Spinner />
  </Flex>
);
