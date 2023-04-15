import { NotionWord } from '@domain/rest/rest.models';

export const findNotionWordIndexById = (notionWords: NotionWord[], notionWordId: string) =>
  notionWords.findIndex((_notionWord) => _notionWord.id === notionWordId);
