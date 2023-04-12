import { TNotionTableColumn } from '@domain/rest/rest.models';

import { functionImportTest } from '@shared/functions';

import { getInitialFormValuesFromTableColumns } from './get-initial-form-values-from-table-columns.function';

describe('getInitialFormValuesFromTableColumns function', () => {
  functionImportTest(getInitialFormValuesFromTableColumns);

  it('should return empty object for empty array', () => {
    expect(getInitialFormValuesFromTableColumns([])).toEqual({});
  });

  it('should return object with one key for one column', () => {
    const columnMock: TNotionTableColumn = {
      columnName: 'test',
      isExampleSentence: false,
      isMeaning: false,
      isWord: true,
      type: 'title',
      position: 0,
    };

    expect(getInitialFormValuesFromTableColumns([columnMock])).toEqual({
      test: '',
    });
  });

  it('should attach first options value as initial value for select', () => {
    const columnMock: TNotionTableColumn = {
      columnName: 'test',
      options: ['test', 'test2'],
      type: 'multi_select',
      position: 0,
    };

    expect(getInitialFormValuesFromTableColumns([columnMock])).toEqual({
      test: 'test',
    });
  });

  it('should assign default values from query params', () => {
    const columnMock: TNotionTableColumn = {
      columnName: 'word',
      isExampleSentence: false,
      isMeaning: false,
      isWord: true,
      type: 'title',
      position: 0,
    };

    expect(
      getInitialFormValuesFromTableColumns([columnMock], {
        word: 'test1',
      }),
    ).toEqual({
      word: 'test1',
    });
  });
});
