import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const getTextFromPagePropertyInstance =
  (pageProperties: PageObjectResponse['properties']) => (propertyNames: string | string[]) => {
    const parsedPropertyNames = Array.isArray(propertyNames) ? propertyNames : [propertyNames];

    let selectedPageProperties = pageProperties[parsedPropertyNames[0]];

    if (!selectedPageProperties) {
      for (const _propertyName of parsedPropertyNames) {
        if (pageProperties[_propertyName]) {
          selectedPageProperties = pageProperties[_propertyName];

          break;
        }
      }
    }

    if (!selectedPageProperties) {
      return null;
    }

    if (selectedPageProperties.type === 'title') {
      return selectedPageProperties.title.map((_title) => _title.plain_text).join('');
    }

    if (selectedPageProperties.type === 'rich_text') {
      return selectedPageProperties.rich_text.map((_richText) => _richText.plain_text).join('');
    }

    if (selectedPageProperties.type === 'multi_select') {
      return selectedPageProperties.multi_select.map((_multiSelect) => _multiSelect.name);
    }

    if (selectedPageProperties.type === 'select') {
      return selectedPageProperties.select?.name || '';
    }

    throw new Error(`Unsupported "${selectedPageProperties.type}" type`);
  };
