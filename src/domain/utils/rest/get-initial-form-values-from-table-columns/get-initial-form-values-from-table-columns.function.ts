import { TNotionTableColumn } from '@domain/entities/rest.types';

const getFieldValue = (queryParams: Record<string, string>, column: TNotionTableColumn) => {
  if (column.type === 'multi_select') {
    return column.options[0];
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
  queryParams: Record<string, string>,
) =>
  tableColumns.reduce(
    (_accumulator, column) => ({
      ..._accumulator,
      [column.columnName]: getFieldValue(queryParams, column),
    }),
    {} as Record<string, string>,
  );
