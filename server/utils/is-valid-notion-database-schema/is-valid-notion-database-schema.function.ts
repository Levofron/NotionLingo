import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@config/constants';

import {
  IDatabaseProperties,
  IValidDatabaseProperties,
} from './is-valid-notion-database-schema.types';

const validDatabaseProperties: IValidDatabaseProperties[] = [
  { type: 'title', names: SUPPORTED_WORD_COLUMN_NAMES },
  { type: 'rich_text', names: SUPPORTED_MEANING_COLUMN_NAMES },
  { type: 'rich_text', names: SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES },
];

const hasValidTypeAndName =
  (databasePropertiesValues: IDatabaseProperties[]) =>
  (currentDatabaseProperty: IValidDatabaseProperties) =>
    databasePropertiesValues.some(
      (_value) =>
        currentDatabaseProperty.names.includes(_value.name) &&
        _value.type === currentDatabaseProperty.type,
    );

export const isValidNotionDatabaseSchema = (
  databaseProperties: Record<string, IDatabaseProperties>,
) => {
  const databasePropertiesValues = Object.values(databaseProperties);

  return validDatabaseProperties.every(hasValidTypeAndName(databasePropertiesValues));
};
