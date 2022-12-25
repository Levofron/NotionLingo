import { IPageProperties } from './is-valid-notion-page-schema.types';

const validPageProperties: IPageProperties[] = [
  { type: 'title', name: 'Word' },
  { type: 'rich_text', name: 'Meaning' },
  { type: 'rich_text', name: 'Example sentence' },
];

const hasValidTypeAndName =
  (pagePropertiesValues: IPageProperties[]) => (currentPageProperty: IPageProperties) =>
    pagePropertiesValues.some(
      (_value) =>
        _value.name === currentPageProperty.name && _value.type === currentPageProperty.type,
    );

export const isValidNotionPageSchema = (pageProperties: Record<string, IPageProperties>) => {
  const pagePropertiesValues = Object.values(pageProperties);

  return validPageProperties.every(hasValidTypeAndName(pagePropertiesValues));
};
