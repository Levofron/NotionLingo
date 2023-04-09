import { TbError404 } from 'react-icons/tb';

import { Flex } from '@presentation/atoms';
import { DisplayError, ParticlesBackgroundLayout } from '@presentation/molecules';

import { useRouter } from '@infrastructure/hooks';

export const NotFound = () => {
  const { redirectToHome } = useRouter();

  return (
    <ParticlesBackgroundLayout height="100%">
      <Flex align="center" h="100%" justify="center" w="100%">
        <DisplayError
          errorMessage="This page was not found. You may have mistyped the address or the page may have moved."
          icon={TbError404}
          title="Page not found :("
          onRedirectToHomeButtonClick={redirectToHome}
        />
      </Flex>
    </ParticlesBackgroundLayout>
  );
};
