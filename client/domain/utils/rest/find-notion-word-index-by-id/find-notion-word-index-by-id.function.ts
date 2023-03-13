import { INotionWord } from '@domain/entities/rest.types';

export const findNotionWordIndexById = (notionWords: INotionWord[], notionWordId: string) =>
  notionWords.findIndex((_notionWord) => _notionWord.id === notionWordId);
