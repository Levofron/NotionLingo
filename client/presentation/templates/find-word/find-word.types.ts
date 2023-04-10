import { ChangeEvent } from 'react';

import { IDictionarySuggestions } from '@domain/rest/rest.types';

export interface IFindWordProps {
  dictionarySuggestions: IDictionarySuggestions | null;
  dictionarySuggestionsError: string | null;
  hasSessionUser: boolean;
  isDictionarySuggestionsLoading: boolean;
  onAddWordClick: (word: string, meaning: string, exampleSentence: string) => () => void;
  onCopy: (phrase: string) => () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  queryStateWord: string | null;
}
