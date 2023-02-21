import { object, string } from 'yup';

import { TNotionTableColumn } from '@domain/entities/rest.types';

export const getAddWordFormValidationSchema = (tableColumns: TNotionTableColumn[]) =>
  object().shape(
    Object.fromEntries(
      tableColumns.map((_column) => [
        _column.columnName,
        _column.type === 'multi_select'
          ? string().oneOf(_column.options).required()
          : string().max(_column.isWord ? 50 : 100, 'Too Long!'),
      ]),
    ),
  );
