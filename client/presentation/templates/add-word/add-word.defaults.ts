import { object, string } from 'yup';

import { NotionTableColumn } from '@domain/rest/rest.models';

export const getAddWordFormValidationSchema = (tableColumns: NotionTableColumn[]) =>
  object().shape(
    Object.fromEntries(
      tableColumns.map((_column) => [
        _column.columnName,
        _column.type === 'multi_select'
          ? string().oneOf(_column.options).required()
          : string().max(_column.isWord ? 50 : 200, 'Too Long!'),
      ]),
    ),
  );
