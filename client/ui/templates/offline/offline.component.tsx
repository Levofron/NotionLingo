import { RiWifiOffLine } from 'react-icons/ri';

import { Flex } from '@ui/atoms';
import { DisplayError, ParticlesBackgroundLayout } from '@ui/molecules';

import { useHealthCheck } from '@adapter/hooks';

import { useRouter, useToast } from '@infrastructure/utils';

export const OfflineTemplate = (): JSX.Element => {
  const toast = useToast();
  const { redirectToHome } = useRouter();
  const { healthCheck, isHealthCheckLoading } = useHealthCheck();

  const handleRedirectToHome = () =>
    healthCheck()
      .then(redirectToHome)
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      );

  return (
    <ParticlesBackgroundLayout height="100%">
      <Flex align="center" h="100%" justify="center" w="100%">
        <DisplayError
          errorMessage="We couldn't connect to the server. Please check your internet connection and try again."
          icon={RiWifiOffLine}
          isLoading={isHealthCheckLoading}
          title="You are offline :("
          onRedirectToHomeButtonClick={handleRedirectToHome}
        />
      </Flex>
    </ParticlesBackgroundLayout>
  );
};
