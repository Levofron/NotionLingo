import { ApiError } from 'next/dist/server/api-utils';

import { HttpStatusCode } from '@server/http-status-code';

import { getProfileById } from '../get-profile-by-id/get-profile-by-id.function';

export const getProfileDataWithNotionDataCheck = async (userId: string) => {
  const profileData = await getProfileById(userId);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  if (!profileData.notion_database_id) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a selected notion database id',
    );
  }

  return profileData;
};
