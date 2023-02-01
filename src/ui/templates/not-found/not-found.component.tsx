import { useRouter } from 'next/router';
import { TbError404 } from 'react-icons/tb';

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

export const NotFoundTemplate = (): JSX.Element => {
  const router = useRouter();

  const redirectToHome = () => router.push(ERoutes.HOME);

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <Flex align="center" h="100%" justify="center" w="100%">
        <Card align="center" as={Flex} bg="gray.50" gap={6} maxW="lg" p={8} textAlign="center">
          <Icon as={TbError404} color="gray.900" fontSize="100" />
          <Stack spacing={2}>
            <Heading>Page not found :(</Heading>
            <Text withBalancer>
              This page was not found. You may have mistyped the address or the page may have moved.
            </Text>
          </Stack>
          <Flex>
            <Button onClick={redirectToHome}>Take me to the home page</Button>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
};
