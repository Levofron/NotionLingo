import { hasOwnProperty, isObject, isString } from '@infrastructure/guards';

import { decrypt } from '../decrypt/decrypt.function';

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
