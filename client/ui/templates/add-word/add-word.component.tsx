import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { BiErrorAlt } from 'react-icons/bi';

import { Flex, Text } from '@ui/atoms';
import { DisplayError, FullScreenLoader, ParticlesBackgroundLayout } from '@ui/molecules';
import { AddWordForm, SidebarWithHeader } from '@ui/organisms';

import { getInitialFormValuesFromTableColumns } from '@domain/rest/helpers';

import { useRouter } from '@infrastructure/hooks';

import { getAddWordFormValidationSchema } from './add-word.defaults';
import { IAddWordProps } from './add-word.types';

export const AddWord: FC<IAddWordProps> = ({
  error,
  isCreateWordLoading,
  isTableColumnsLoading,
  onRefetchButtonClick,
  onSubmit,
  redirectToHome,
  tableColumns,
}): JSX.Element => {
  const router = useRouter();

  const formik = useFormik({
    isInitialValid: true,
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: true,
    validationSchema: getAddWordFormValidationSchema(tableColumns || []),
    initialValues: getInitialFormValuesFromTableColumns(
      tableColumns || [],
      router.query as Record<string, string>,
    ),
    onSubmit: (_values) => {
      const initialValues = getInitialFormValuesFromTableColumns(tableColumns!);

      const reset = () => formik.setValues(initialValues);

      onSubmit(_values, reset);
    },
  });

  useEffect(() => {
    const hasValues = !!formik.values && Object.keys(formik.values).length > 0;

    if (!hasValues) {
      formik.setValues(
        getInitialFormValuesFromTableColumns(
          tableColumns || [],
          router.query as Record<string, string>,
        ),
      );
    }
  }, [tableColumns]);

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

    if (error && !tableColumns) {
      return (
        <DisplayError
          errorMessage={error}
          icon={BiErrorAlt}
          title="Error occured :("
          onRedirectToHomeButtonClick={redirectToHome}
          onRefetchButtonClick={onRefetchButtonClick}
        />
      );
    }

    return (
      <AddWordForm
        errors={formik.errors}
        isLoading={isCreateWordLoading}
        tableColumns={tableColumns}
        values={formik.values}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
      />
    );
  };

  return (
    <>
      <SidebarWithHeader />
      <ParticlesBackgroundLayout height="100%">
        <Flex align="center" h="100%" justify="center" w="100%">
          {renderContent()}
        </Flex>
      </ParticlesBackgroundLayout>
    </>
  );
};
