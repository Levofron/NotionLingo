import { NotionTableColumn } from '@domain/rest/rest.models';

const getFieldValue = (column: NotionTableColumn, queryParams?: Record<string, string>) => {
  if (column.type === 'multi_select') {
    return column.options[0] || '';
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
  tableColumns: NotionTableColumn[],
  queryParams?: Record<string, string>,
) =>
  tableColumns.reduce(
    (_accumulator, column) => ({
      ..._accumulator,
      [column.columnName]: getFieldValue(column, queryParams),
    }),
    {} as Record<string, string>,
  );
