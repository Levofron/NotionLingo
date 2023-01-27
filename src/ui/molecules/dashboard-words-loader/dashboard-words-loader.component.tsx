import { FC } from 'react';

import { Text } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';

export const DashboardWordsLoader: FC = (): JSX.Element => (
  <FullScreenLoader
    backgroundColor="transparent"
    flexDirection="column"
    gap={{ base: 3, sm: 5 }}
    position="relative"
  >
    <Text fontWeight="medium">Loading words...</Text>
  </FullScreenLoader>
);
