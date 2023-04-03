import { FC } from 'react';
import { RiWifiOffLine } from 'react-icons/ri';

import { Flex } from '@ui/atoms';
import { DisplayError, ParticlesBackgroundLayout } from '@ui/molecules';

import { IOfflineProps } from './offline.types';

export const Offline: FC<IOfflineProps> = ({ isLoading, onRedirectToHome }) => (
  <ParticlesBackgroundLayout height="100%">
    <Flex align="center" h="100%" justify="center" w="100%">
      <DisplayError
        errorMessage="We couldn't connect to the server. Please check your internet connection and try again."
        icon={RiWifiOffLine}
        isLoading={isLoading}
        title="You are offline :("
        onRedirectToHomeButtonClick={onRedirectToHome}
      />
    </Flex>
  </ParticlesBackgroundLayout>
);
