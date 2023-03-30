import { useEffect } from 'react';
import { BiErrorAlt } from 'react-icons/bi';

import { Flex, SEO, Text } from '@ui/atoms';
import { withCheckIfUserLogged } from '@ui/hoc';
import { DisplayError, FullScreenLoader, ParticlesBackgroundLayout } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { AddWordTemplate } from '@ui/templates';

import { useTableColumns } from '@adapter/hooks';

import { useRouter } from '@infrastructure/hooks';
import { ERoutes } from '@infrastructure/routes';

const AddWordPageComponent = (): JSX.Element => {
  const { redirectToHome } = useRouter();

  const {
    getTableColumns,
    isTableColumnsLoading,
    resetTableColumns,
    tableColumns,
    tableColumnsError,
  } = useTableColumns();

  useEffect(getTableColumns, []);

  const handleRefetch = () => {
    resetTableColumns();
    getTableColumns();
  };

  const renderContent = () => {
    if (isTableColumnsLoading || !tableColumns) {
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

    if (tableColumnsError && !tableColumns) {
      return (
        <DisplayError
          errorMessage={tableColumnsError}
          icon={BiErrorAlt}
          title="Error occured :("
          onRedirectToHomeButtonClick={redirectToHome}
          onRefetchButtonClick={handleRefetch}
        />
      );
    }

    return <AddWordTemplate tableColumns={tableColumns} />;
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
