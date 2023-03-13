import { useEffect } from 'react';
import { BiErrorAlt } from 'react-icons/bi';

import { Flex, SEO, Text } from '@ui/atoms';
import { withCheckIfUserLogged } from '@ui/hoc';
import { DisplayError, FullScreenLoader, ParticlesBackgroundLayout } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { AddWordTemplate } from '@ui/templates';

import { restModule } from '@adapter/modules';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxios, useRouter } from '@infrastructure/utils';

const AddWordPageComponent = (): JSX.Element => {
  const { redirectToHome } = useRouter();

  const { data, error, isLoading, mutate, reset } = useAxios(restModule.getNotionTableColumns);

  useEffect(mutate, []);

  const handleRefetch = () => {
    reset();
    mutate();
  };

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
          onRedirectToHomeButtonClick={redirectToHome}
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
      <ParticlesBackgroundLayout height="100%">
        <Flex align="center" h="100%" justify="center" w="100%">
          {renderContent()}
        </Flex>
      </ParticlesBackgroundLayout>
    </>
  );
};

export const AddWordPage = withCheckIfUserLogged(AddWordPageComponent, {
  currentPageUrl: ERoutes.ADD_WORD,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
