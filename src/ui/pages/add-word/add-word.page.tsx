import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BiErrorAlt } from 'react-icons/bi';

import { Box, Flex, ParticlesBackground, SEO, Text } from '@ui/atoms';
import { DisplayError, FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { AddWordTemplate } from '@ui/templates';

import { restModule } from '@adapter/modules';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxiosAction } from '@infrastructure/utils';

export const AddWordPage = (): JSX.Element => {
  const router = useRouter();

  const { data, error, isLoading, mutate, reset } = useAxiosAction(
    restModule.getNotionTableColumns,
  );

  useEffect(mutate, []);

  const handleRefetch = () => {
    reset();
    mutate();
  };

  const handleRedirectToHome = () => router.push(ERoutes.HOME);

  const renderContent = () => {
    if (isLoading || !data) {
      return (
        <FullScreenLoader
          backgroundColor="transparent"
          flexDirection="column"
          gap={{ base: 3, sm: 5 }}
          position="relative"
          zIndex={1}
        >
          <Text fontWeight="medium">Loading table columns...</Text>
        </FullScreenLoader>
      );
    }

    if (error && !data) {
      return (
        <DisplayError
          errorMessage={error}
          icon={BiErrorAlt}
          title="Error occured :("
          onRedirectToHomeButtonClick={handleRedirectToHome}
          onRefetchButtonClick={handleRefetch}
        />
      );
    }

    return <AddWordTemplate tableColumns={data} />;
  };

  return (
    <>
      <SEO noFollow noIndex title="Add word" />
      <SidebarWithHeader />
      <Box bg="gray.50" height="100%" overflow="hidden">
        <ParticlesBackground />
        <Flex align="center" h="100%" justify="center" w="100%">
          {renderContent()}
        </Flex>
      </Box>
    </>
  );
};
