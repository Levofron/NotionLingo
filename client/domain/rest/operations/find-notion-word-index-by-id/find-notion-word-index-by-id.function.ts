import { INotionWord } from '@domain/rest/rest.types';

export const findNotionWordIndexById = (notionWords: INotionWord[], notionWordId: string) =>
  notionWords.findIndex((_notionWord) => _notionWord.id === notionWordId);
