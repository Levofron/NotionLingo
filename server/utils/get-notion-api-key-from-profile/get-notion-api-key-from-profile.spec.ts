import { functionImportTest } from '@infrastructure/jest';

import { getNotionApiKeyFromProfile } from './get-notion-api-key-from-profile.function';

describe('getNotionApiKeyFromProfile function', () => {
  functionImportTest(getNotionApiKeyFromProfile);

  it('should return empty string if profile data is not an object', () => {
    const result = getNotionApiKeyFromProfile(null);

    expect(result).toEqual('');
  });

  it('should return empty string if profile data does not have notion_api_key property', () => {
    const result = getNotionApiKeyFromProfile({});

    expect(result).toEqual('');
  });

  it('should return empty string if profile data does not have notion_api_key property as string', () => {
    const result = getNotionApiKeyFromProfile({ notion_api_key: 1 });

    expect(result).toEqual('');
  });

  it('should return decrypted notion api key', () => {
    const profileData = {
      notion_api_key:
        '{"content":"a5c99b73a57c4a1dfd0d8e","iv":"424488d2e4e2d125cbf5970684a9d765"}',
    };

    const result = getNotionApiKeyFromProfile(profileData);

    expect(result).toEqual('test string');
  });
});
