import { useFormik } from 'formik';
import { FC } from 'react';

import { Button, Card, Flex } from '@ui/atoms';
import { InputControl, SelectControl } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { getInitialFormValuesFromTableColumns } from '@domain/utils/rest';

import { useAxios, useRouter, useToast } from '@infrastructure/utils';

import { getAddWordFormValidationSchema } from './add-word.defaults';
import { IAddWordTemplateProps } from './add-word.types';

export const AddWordTemplate: FC<IAddWordTemplateProps> = ({ tableColumns }): JSX.Element => {
  const toast = useToast();
  const router = useRouter();

  const { isLoading: isCreateNotionWordLoading, mutateAsync: mutateAsyncCreateNotionWord } =
    useAxios(restModule.createNotionWord);

  const formik = useFormik({
    isInitialValid: true,
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: true,
    validationSchema: getAddWordFormValidationSchema(tableColumns),
    initialValues: getInitialFormValuesFromTableColumns(
      tableColumns,
      router.query as Record<string, string>,
    ),
    onSubmit: (_values) => {
      mutateAsyncCreateNotionWord(_values)
        .then(() => {
          const initialValues = getInitialFormValuesFromTableColumns(tableColumns);

          formik.setValues(initialValues);
          router.redirectWithReplaceToAddWord();

          toast.success({
            description: 'Word saved!',
          });
        })
        .catch((_error) =>
          toast.error({
            description: _error,
          }),
        );
    },
  });

  return (
    <Card minW={{ base: 'unset', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDirection="column" gap="3px">
          {tableColumns.map((_column) => {
            const shouldRenderSelect = _column.type === 'multi_select';

            if (shouldRenderSelect) {
              return (
                <SelectControl
                  key={_column.columnName}
                  isRequired
                  errorMessage={formik.errors[_column.columnName]}
                  label={_column.columnName}
                  name={_column.columnName}
                  value={formik.values[_column.columnName]}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  {_column.options.map((_option) => (
                    <option key={_option} value={_option}>
                      {_option}
                    </option>
                  ))}
                </SelectControl>
              );
            }

            return (
              <InputControl
                key={_column.columnName}
                errorMessage={formik.errors[_column.columnName]}
                isRequired={_column.isWord}
                label={_column.columnName}
                name={_column.columnName}
                value={formik.values[_column.columnName]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            );
          })}
          <Button isLoading={isCreateNotionWordLoading} mt={2} type="submit" width="full">
            Add word
          </Button>
        </Flex>
      </form>
    </Card>
  );
};
