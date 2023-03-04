import { TbError404 } from 'react-icons/tb';

import { Box, Flex, ParticlesBackground } from '@ui/atoms';
import { DisplayError } from '@ui/molecules';

import { useRouter } from '@infrastructure/utils';

export const NotFoundTemplate = (): JSX.Element => {
  const { redirectToHome } = useRouter();

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <Flex align="center" h="100%" justify="center" w="100%">
        <DisplayError
          errorMessage="This page was not found. You may have mistyped the address or the page may have moved."
          icon={TbError404}
          title="Page not found :("
          onRedirectToHomeButtonClick={redirectToHome}
        />
      </Flex>
    </Box>
  );
};
