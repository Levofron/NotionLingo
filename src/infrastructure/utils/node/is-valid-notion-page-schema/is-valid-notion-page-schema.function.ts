import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@constants';

import { IPageProperties, IValidPageProperties } from './is-valid-notion-page-schema.types';

const validPageProperties: IValidPageProperties[] = [
  { type: 'title', names: SUPPORTED_WORD_COLUMN_NAMES },
  { type: 'rich_text', names: SUPPORTED_MEANING_COLUMN_NAMES },
  { type: 'rich_text', names: SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES },
];

const hasValidTypeAndName =
  (pagePropertiesValues: IPageProperties[]) => (currentPageProperty: IValidPageProperties) =>
    pagePropertiesValues.some(
      (_value) =>
        currentPageProperty.names.includes(_value.name) && _value.type === currentPageProperty.type,
    );

export const isValidNotionPageSchema = (pageProperties: Record<string, IPageProperties>) => {
  const pagePropertiesValues = Object.values(pageProperties);

  return validPageProperties.every(hasValidTypeAndName(pagePropertiesValues));
};
