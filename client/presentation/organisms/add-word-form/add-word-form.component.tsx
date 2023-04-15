import React, { FC, useMemo } from 'react';

import { Button, Card, Flex } from '@presentation/atoms';
import { InputControl, SelectControl } from '@presentation/molecules';

import { AddWordFormProps } from './add-word-form.types';

export const AddWordForm: FC<AddWordFormProps> = ({
  errors,
  isLoading,
  onBlur,
  onChange,
  onSubmit,
  tableColumns,
  values,
}) => {
  const formElements = useMemo(() => {
    if (Object.keys(values).length === 0) {
      return null;
    }

    return tableColumns.map((_column) => {
      const shouldRenderSelect = _column.type === 'multi_select';

      if (shouldRenderSelect) {
        return (
          <SelectControl
            key={_column.columnName}
            isRequired
            errorMessage={errors[_column.columnName]}
            label={_column.columnName}
            name={_column.columnName}
            value={values[_column.columnName]}
            onBlur={onBlur}
            onChange={onChange}
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
          errorMessage={errors[_column.columnName]}
          isRequired={_column.isWord}
          label={_column.columnName}
          name={_column.columnName}
          value={values[_column.columnName]}
          onBlur={onBlur}
          onChange={onChange}
        />
      );
    });
  }, [tableColumns, values, errors, onBlur, onChange]);

  return (
    <Card minW={{ base: 'unset', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
      <form onSubmit={onSubmit}>
        <Flex flexDirection="column" gap="3px">
          {formElements}
          <Button isLoading={isLoading} mt={2} type="submit" width="full">
            Add word
          </Button>
        </Flex>
      </form>
    </Card>
  );
};
