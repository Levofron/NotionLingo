import { useEffect } from 'react';

import { withCheckIfUserLogged } from '@ui/hoc';
import { AddWord as AddWordTemplate } from '@ui/templates';

import { useCreateWord, useTableColumns } from '@adapter/hooks';

import { useRouter, useToast } from '@infrastructure/hooks';
import { ERoutes } from '@infrastructure/routes';

const AddWordComponent = () => {
  const toast = useToast();
  const router = useRouter();

  const {
    getTableColumns,
    isTableColumnsLoading,
    resetTableColumns,
    tableColumns,
    tableColumnsError,
  } = useTableColumns();

  const { createWord, isCreateWordLoading } = useCreateWord();

  useEffect(getTableColumns, []);

  const isFindWordAsPreviousPath = router.getPreviousPath() === ERoutes.FIND_WORD;

  const handleRefetch = () => {
    resetTableColumns();
    getTableColumns();
  };

  const handleSubmit = (values: Record<string, string>, resetFormik: () => void) => {
    createWord(values)
      .then(() => {
        resetFormik();
        router.redirectWithReplaceToAddWord();

        toast.success({
          duration: 2000,
          description: 'Word saved!',
        });

        if (isFindWordAsPreviousPath) {
          setTimeout(() => {
            router.redirectTo(ERoutes.FIND_WORD);
          }, 2000);
        }
      })
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      );
  };

  return (
    <AddWordTemplate
      error={tableColumnsError}
      isCreateWordLoading={isCreateWordLoading}
      isTableColumnsLoading={isTableColumnsLoading}
      redirectToHome={router.redirectToHome}
      tableColumns={tableColumns}
      onRefetchButtonClick={handleRefetch}
      onSubmit={handleSubmit}
    />
  );
};

export const AddWord = withCheckIfUserLogged(AddWordComponent, {
  currentPageUrl: ERoutes.ADD_WORD,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
