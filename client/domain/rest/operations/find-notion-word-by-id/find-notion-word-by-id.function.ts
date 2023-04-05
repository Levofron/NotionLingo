import { INotionWord } from '@domain/rest/rest.types';

export const findNotionWordById = (notionWords: INotionWord[], notionWordId: string) =>
  notionWords.find((_notionWord) => _notionWord.id === notionWordId);
