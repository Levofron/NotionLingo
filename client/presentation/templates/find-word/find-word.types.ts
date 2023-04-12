import { ChangeEvent } from 'react';

import { IDictionarySuggestions } from '@domain/rest/rest.models';

export interface IFindWordProps {
  dictionarySuggestions: IDictionarySuggestions | null;
  dictionarySuggestionsError: string | null;
  isDictionarySuggestionsLoading: boolean;
  isUserAuthenticated: boolean;
  isUserLoading: boolean | undefined;
  onAddWordClick: (word: string, meaning: string, exampleSentence: string) => () => void;
  onCopy: (phrase: string) => () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  queryStateWord: string | null;
}
