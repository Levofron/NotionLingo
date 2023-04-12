import { INotionWord } from '@domain/rest/rest.models';

export const findNotionWordById = (notionWords: INotionWord[], notionWordId: string) =>
  notionWords.find((_notionWord) => _notionWord.id === notionWordId);
