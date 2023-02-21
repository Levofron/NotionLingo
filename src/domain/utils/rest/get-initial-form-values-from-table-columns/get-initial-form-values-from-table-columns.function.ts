import { TNotionTableColumn } from '@domain/entities/rest.types';

export const getInitialFormValuesFromTableColumns = (tableColumns: TNotionTableColumn[]) =>
  tableColumns.reduce(
    (_accumulator, column) => ({
      ..._accumulator,
      [column.columnName]: column.type === 'multi_select' ? column.options[0] : '',
    }),
    {} as Record<string, string>,
  );
