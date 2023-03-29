import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { cleanUpString } from '@infrastructure/functions';
import { isString } from '@infrastructure/guards';

import { EHttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  generateMemoryCacheKey,
  getNotionApiKeyFromProfile,
  getNotionTableColumns,
  getProfileDataWithNotionDataCheck,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { getTitleOrRichTextProperty } from './update';

const getMultiSelectProperty = (columnName: string, type: string, newValue: string) => {
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

  const notionApiKey = getNotionApiKeyFromProfile(profileData);
  const notionClient = createNotionClient(notionApiKey);
  const tableColumns = await getNotionTableColumns(notionApiKey, profileData.notion_database_id);

  const requestBodyKeys = Object.keys(requestBody);

  if (!requestBodyKeys?.length) {
    throw new ApiError(EHttpStatusCode.BAD_REQUEST, 'You need to provide a body');
  }

  const invalidTableColumns = tableColumns.filter((_tableColumn) => {
    const isInvalid = !requestBodyKeys.includes(_tableColumn?.columnName!);
    const isInvalidType = !isString(requestBody[_tableColumn?.columnName!]);

    return isInvalid || isInvalidType;
  });

  if (invalidTableColumns.length > 0) {
    const invalidTableColumnsAsString = invalidTableColumns
      .map((_tableColumn) => _tableColumn?.columnName)
      .join(', ');

    throw new ApiError(
      EHttpStatusCode.BAD_REQUEST,
      `You need to provide all the columns in the body. The following columns are missing: ${invalidTableColumnsAsString}`,
    );
  }

  const multiSelectTableColumns = tableColumns.filter(
    (_tableColumn) => _tableColumn?.type === 'multi_select',
  );

  if (multiSelectTableColumns.length > 0) {
    for (const _multiSelectTableColumn of multiSelectTableColumns) {
      if (!_multiSelectTableColumn) {
        continue;
      }

      const multiSelectValue = requestBody[_multiSelectTableColumn.columnName!];

      const isValidOption = _multiSelectTableColumn.options?.includes(multiSelectValue);

      if (!isValidOption) {
        throw new ApiError(
          EHttpStatusCode.BAD_REQUEST,
          `The provided value for the column "${_multiSelectTableColumn.columnName}" is not valid`,
        );
      }
    }
  }

  const newNotionRecordProperties = tableColumns.reduce((_accumulator, _tableColumn) => {
    const type = _tableColumn?.type;
    const columnName = _tableColumn?.columnName;
    const cleanedStringValue = cleanUpString(requestBody[columnName!]);

    const getColumnProperty =
      type === 'multi_select' ? getMultiSelectProperty : getTitleOrRichTextProperty;

    const newValue = getColumnProperty(columnName!, type!, cleanedStringValue);

    return {
      ..._accumulator,
      ...newValue,
    };
  }, {});

  const result = await notionClient.pages.create({
    parent: {
      database_id: profileData.notion_database_id,
    },
    properties: newNotionRecordProperties,
  });

  const cacheKey = generateMemoryCacheKey(user!.id, profileData.notion_database_id, notionApiKey);

  memoryCache.del(cacheKey);

  return res.status(EHttpStatusCode.OK).json({
    id: result.id,
    properties: requestBody,
  });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
