import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ApiError } from 'next/dist/server/api-utils';

import { isObject, objectKeys } from '@infrastructure/guards';

import { EHttpStatusCode } from '@server/http-status-code';

import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@config/constants';

import { getAvailableNotionDatabases } from '../get-available-notion-databases/get-available-notion-databases.function';

const getPosition = (isWord: boolean, isMeaning: boolean) => {
  if (isWord) {
    return 1;
  }

  return isMeaning ? 2 : 3;
};

const parsePropertiesToResponse = (properties: DatabaseObjectResponse['properties']) => {
  const parsedProperties = objectKeys(properties).map((_key) => {
    const property = properties[_key];

    if (!isObject(property) || Array.isArray(property)) {
      return null;
    }

    if (property.type === 'multi_select') {
      return {
        position: 4,
        columnName: _key,
        type: property.type,
        options: property.multi_select.options.map((_option) => _option.name),
      };
    }

    const isWord = SUPPORTED_WORD_COLUMN_NAMES.includes(_key);
    const isMeaning = SUPPORTED_MEANING_COLUMN_NAMES.includes(_key);
    const isExampleSentence = SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES.includes(_key);

    if (!isWord && !isMeaning && !isExampleSentence) {
      return null;
    }

    return {
      isWord,
      isMeaning,
      columnName: _key,
      isExampleSentence,
      type: property.type,
      position: getPosition(isWord, isMeaning),
    };
  });

  return parsedProperties.filter(Boolean).sort((a, b) => a!.position - b!.position);
};

export const getNotionTableColumns = async (notionApiKey: string, notionDatabaseId: string) => {
  const availableDatabases = await getAvailableNotionDatabases(notionApiKey);

  const foundDatabase = availableDatabases.find(
    (_database) => _database.id === notionDatabaseId,
  ) as DatabaseObjectResponse;

  if (!foundDatabase) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have any available pages',
    );
  }

  return parsePropertiesToResponse(foundDatabase.properties);
};
