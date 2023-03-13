import { INotionWord } from '@domain/entities/rest.types';

export const findNotionWordById = (notionWords: INotionWord[], notionWordId: string) =>
  notionWords.find((_notionWord) => _notionWord.id === notionWordId);
