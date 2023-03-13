import { hasOwnProperty, isObject, isString } from '@infrastructure/utils';

import { decrypt } from '..';

export const getNotionApiKeyFromProfile = (profileData: unknown) => {
  if (
    !isObject(profileData) ||
    !hasOwnProperty(profileData, 'notion_api_key') ||
    !isString(profileData.notion_api_key)
  ) {
    return '';
  }

  const hash = JSON.parse(profileData?.notion_api_key);

  return decrypt(hash);
};
