import { RiWifiOffLine } from 'react-icons/ri';

import { Box, Flex, ParticlesBackground } from '@ui/atoms';
import { DisplayError } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { useAxiosAction, useRouter, useToast } from '@infrastructure/utils';

export const OfflineTemplate = (): JSX.Element => {
  const toast = useToast();
  const { redirectToHome } = useRouter();
  const { isLoading, mutateAsync } = useAxiosAction(restModule.healthCheck);

  const handleRedirectToHome = () =>
    mutateAsync()
      .then(redirectToHome)
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
