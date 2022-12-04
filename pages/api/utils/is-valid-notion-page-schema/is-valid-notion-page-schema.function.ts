import { IPageProperties } from './is-valid-notion-page-schema.types';

// TODO - add field type validation
const validPageProperties = ['Word', 'Meaning', 'Example sentence'];

export const isValidNotionPageSchema = (pageProperties: Record<string, IPageProperties>) => {
  const values = Object.values(pageProperties);

  return validPageProperties.every((_validPageProperty) =>
    values.find((_value) => _value.name === _validPageProperty),
  );
};
