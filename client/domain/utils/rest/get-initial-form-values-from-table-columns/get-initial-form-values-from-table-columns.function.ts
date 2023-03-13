import { TNotionTableColumn } from '@domain/entities/rest.types';

const getFieldValue = (column: TNotionTableColumn, queryParams?: Record<string, string>) => {
  if (column.type === 'multi_select') {
    return column.options[0];
  }

  if (!queryParams) {
    return '';
  }

  if (column.isWord) {
    return queryParams.word || '';
  }

  if (column.isMeaning) {
    return queryParams.meaning || '';
  }

  if (column.isExampleSentence) {
    return queryParams.exampleSentence || '';
  }

  return '';
};

export const getInitialFormValuesFromTableColumns = (
  tableColumns: TNotionTableColumn[],
  queryParams?: Record<string, string>,
) =>
  tableColumns.reduce(
    (_accumulator, column) => ({
      ..._accumulator,
      [column.columnName]: getFieldValue(column, queryParams),
    }),
    {} as Record<string, string>,
  );
