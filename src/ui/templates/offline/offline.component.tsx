import { useRouter } from 'next/router';
import { RiWifiOffLine } from 'react-icons/ri';

import { Box, Flex, ParticlesBackground } from '@ui/atoms';
import { DisplayError } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxiosAction, useToast } from '@infrastructure/utils';

export const OfflineTemplate = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { isLoading, mutateAsync } = useAxiosAction(restModule.healthCheck);

  const handleRedirectToHome = () =>
    mutateAsync()
      .then(() => router.push(ERoutes.HOME))
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      );

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <Flex align="center" h="100%" justify="center" w="100%">
        <DisplayError
          errorMessage="We couldn't connect to the server. Please check your internet connection and try again."
          icon={RiWifiOffLine}
          isLoading={isLoading}
          title="You are offline :("
          onRedirectToHomeButtonClick={handleRedirectToHome}
        />
      </Flex>
    </Box>
  );
};
