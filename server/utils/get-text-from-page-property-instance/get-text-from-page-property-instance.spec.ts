import { functionImportTest } from '@infrastructure/functions';

import { SUPPORTED_TYPE_COLUMN_NAMES, SUPPORTED_WORD_COLUMN_NAMES } from '@config/constants';

import { getTextFromPagePropertyInstance } from './get-text-from-page-property-instance.function';

describe('getTextFromPagePropertyInstance function', () => {
  functionImportTest(getTextFromPagePropertyInstance);

  it('should return empty string if page property instance is not an object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getTextFromPagePropertyInstance({} as any)('')).toBeNull();
  });

  it('should return joined title text', () => {
    expect(
      getTextFromPagePropertyInstance({
        Word: {
          type: 'title',
          title: [
            // @ts-expect-error
            {
              plain_text: 'title',
            },
            // @ts-expect-error
            {
              plain_text: '&title',
            },
          ],
        },
      })(SUPPORTED_WORD_COLUMN_NAMES),
    ).toEqual('title&title');
  });

  it('should return joined rich text', () => {
    expect(
      getTextFromPagePropertyInstance({
        Word: {
          type: 'rich_text',
          rich_text: [
            // @ts-expect-error
            {
              plain_text: 'rich_text',
            },
            // @ts-expect-error
            {
              plain_text: '&rich_text',
            },
          ],
        },
      })(SUPPORTED_WORD_COLUMN_NAMES),
    ).toEqual('rich_text&rich_text');
  });

  it('should return joined multi select options', () => {
    expect(
      getTextFromPagePropertyInstance({
        Type: {
          type: 'multi_select',
          multi_select: [
            // @ts-expect-error
            {
              name: 'multi_select',
            },
            // @ts-expect-error
            {
              name: '&multi_select',
            },
          ],
        },
      })(SUPPORTED_TYPE_COLUMN_NAMES),
    ).toEqual(['multi_select', '&multi_select']);
  });

  it('should return select option', () => {
    expect(
      getTextFromPagePropertyInstance({
        Type: {
          type: 'select',
          // @ts-expect-error
          select: {
            name: 'select',
          },
        },
      })(SUPPORTED_TYPE_COLUMN_NAMES),
    ).toEqual('select');
  });

  it('should throw error if type is not supported', () => {
    expect(() =>
      getTextFromPagePropertyInstance({
        Type: {
          // @ts-expect-error
          type: 'unsupported',
        },
      })(SUPPORTED_TYPE_COLUMN_NAMES),
    ).toThrowError('Unsupported "unsupported" type');
  });
});
