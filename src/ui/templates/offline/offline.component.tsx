import { useRouter } from 'next/router';
import { RiWifiOffLine } from 'react-icons/ri';

import { restModule } from '@adapter/modules';

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  ParticlesBackground,
  Stack,
  Text,
} from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxiosAction, useToast } from '@infrastructure/utils';

export const OfflineTemplate = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { loading: isHealthCheckLoading, mutateAsync: mutateAsyncHealthCheck } = useAxiosAction(
    restModule.healthCheck,
  );

  const callHealthCheck = () =>
    mutateAsyncHealthCheck()
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
        <Card align="center" as={Flex} bg="gray.50" gap={6} maxW="lg" p={8} textAlign="center">
          <Icon as={RiWifiOffLine} color="gray.900" fontSize="100" />
          <Stack spacing={2}>
            <Heading>You are offline :(</Heading>
            <Text withBalancer>
              We couldn&apos;t connect to the server. Please check your internet connection and try
              again.
            </Text>
          </Stack>
          <Flex>
            <Button isLoading={isHealthCheckLoading} onClick={callHealthCheck}>
              Take me to the home page
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
};
