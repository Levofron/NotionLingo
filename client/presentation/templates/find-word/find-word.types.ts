import { ChangeEvent } from 'react';

import { DictionarySuggestions } from '@domain/rest/rest.models';

export interface FindWordProps {
  dictionarySuggestions: DictionarySuggestions | null;
  dictionarySuggestionsError: string | null;
  isDictionarySuggestionsLoading: boolean;
  isUserAuthenticated: boolean;
  isUserLoading: boolean | undefined;
  onAddWordClick: (word: string, meaning: string, exampleSentence: string) => () => void;
  onCopy: (phrase: string) => () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  queryStateWord: string | null;
}
