import { Box, SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { FindWordTemplate } from '@ui/templates';

import { useUser } from '@infrastructure/utils';

export const FindWordPage = (): JSX.Element => {
  const { isLoading, isUserAuthenticated } = useUser();

  return (
    <>
      <SEO noFollow noIndex title="Find word" />
      <SidebarWithHeader />
      <Box bg="gray.50" height="100%" w="100%">
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
    </>
  );
};
