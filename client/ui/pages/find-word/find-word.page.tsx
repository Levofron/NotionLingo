import { Box, SEO } from '@ui/atoms';
import { FullScreenLoader, ParticlesBackgroundLayout } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { FindWordTemplate } from '@ui/templates';

import { useUser } from '@infrastructure/utils';

export const FindWordPage = (): JSX.Element => {
  const { isLoading, isUserAuthenticated } = useUser();

  return (
    <>
      <SEO noFollow noIndex title="Find word" />
      <SidebarWithHeader />
      <ParticlesBackgroundLayout height="100%">
        <Box height="100%" overflow="scroll" width="100%">
          {isLoading && !isUserAuthenticated ? (
            <FullScreenLoader
              backgroundColor="transparent"
              flexDirection="column"
              gap={{ base: 3, sm: 5 }}
              position="relative"
              zIndex={1}
            />
          ) : (
            <FindWordTemplate isUserAuthenticated={isUserAuthenticated} />
          )}
        </Box>
      </ParticlesBackgroundLayout>
    </>
  );
};
