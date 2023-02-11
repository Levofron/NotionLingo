import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import { cleanUpString, isString } from '@infrastructure/utils';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

import { getProfileDataWithNotionDataCheck, getTableColumns } from './table-columns';

const generateColumnEditObject = (columnName: string, type: string, newValue: string) => {
  if (!newValue) {
    return null;
  }

  return {
    [columnName]: {
      [type]: [
        {
          text: {
            content: newValue,
          },
        },
      ],
    },
  };
};

const generateMultiSelectEditObject = (columnName: string, type: string, newValue: string) => {
  if (!newValue) {
    return null;
  }

  return {
    [columnName]: {
      [type]: [
        {
          name: newValue,
        },
      ],
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestBody = req.body;
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  const hash = JSON.parse(profileData?.notion_api_key);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);
  const tableColumns = await getTableColumns(notionApiKey, profileData.notion_database_id);

  const requestBodyKeys = Object.keys(requestBody);

  if (!requestBodyKeys?.length) {
    throw new ApiError(EHttpStatusCode.BAD_REQUEST, 'You need to provide a body');
  }

  const invalidTableColumns = tableColumns.filter((_tableColumn) => {
    const isInvalid = !requestBodyKeys.includes(_tableColumn?.columnName!);
    const isInvalidType = !isString(requestBody[_tableColumn?.columnName!]);

    return isInvalid || isInvalidType;
  });

  if (invalidTableColumns?.length !== 0) {
    const invalidTableColumnsAsString = invalidTableColumns
      .map((_tableColumn) => _tableColumn?.columnName)
      .join(', ');

    throw new ApiError(
      EHttpStatusCode.BAD_REQUEST,
      `You need to provide all the columns in the body. The following columns are missing: ${invalidTableColumnsAsString}`,
    );
  }

  const multiSelectValues = tableColumns.filter(
    (_tableColumn) => _tableColumn?.type === 'multi_select',
  );

  if (multiSelectValues?.length) {
    for (const _multiSelectValue of multiSelectValues) {
      const multiSelectValue = requestBody[_multiSelectValue?.columnName!];

      const isValidOption = _multiSelectValue?.options?.includes(multiSelectValue);

      if (!isValidOption) {
        throw new ApiError(
          EHttpStatusCode.BAD_REQUEST,
          `The provided value for the column "${_multiSelectValue?.columnName}" is not valid`,
        );
      }
    }
  }

  const requestBodyWithFormattedValues = tableColumns.reduce((acc, _tableColumn) => {
    const type = _tableColumn?.type;
    const columnName = _tableColumn?.columnName;
    const cleanedStringValue = cleanUpString(requestBody[columnName!]);

    const newValue =
      type !== 'multi_select'
        ? generateColumnEditObject(columnName!, type!, cleanedStringValue)
        : generateMultiSelectEditObject(columnName!, type!, cleanedStringValue);

    return {
      ...acc,
      ...newValue,
    };
  }, {});

  const result = await notionClient.pages.create({
    parent: {
      database_id: profileData.notion_database_id,
    },
    properties: requestBodyWithFormattedValues,
  });

  return res.status(EHttpStatusCode.OK).json(result);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
