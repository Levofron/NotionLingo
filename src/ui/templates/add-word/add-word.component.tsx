import { FC, FormEvent } from 'react';

import { Button, Card, VStack } from '@ui/atoms';
import { InputControl, SelectControl } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { useAxiosAction } from '@infrastructure/utils';

import { IAddWordTemplateProps } from './add-word.types';

export const AddWordTemplate: FC<IAddWordTemplateProps> = ({ tableColumns }): JSX.Element => {
  const { mutateAsync: mutateAsyncCreateNotionWord } = useAxiosAction(restModule.createNotionWord);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: FormEvent<any>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    mutateAsyncCreateNotionWord(data);
  };

  return (
    <Card minW={{ base: 'unset', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
      <VStack as="form" spacing={5} onSubmit={handleSubmit}>
        {tableColumns.map((_column) => {
          const shouldRenderSelect = _column.type === 'multi_select';

          if (shouldRenderSelect) {
            return (
              <SelectControl
                key={_column.columnName}
                label={_column.columnName}
                name={_column.columnName}
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
              isRequired
              label={_column.columnName}
              name={_column.columnName}
            />
          );
        })}
        <Button type="submit" width="full">
          Save word
        </Button>
      </VStack>
    </Card>
  );
};
