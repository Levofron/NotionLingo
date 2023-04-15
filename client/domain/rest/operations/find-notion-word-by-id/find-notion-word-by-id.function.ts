import { NotionWord } from '@domain/rest/rest.models';

export const findNotionWordById = (notionWords: NotionWord[], notionWordId: string) =>
  notionWords.find((_notionWord) => _notionWord.id === notionWordId);
