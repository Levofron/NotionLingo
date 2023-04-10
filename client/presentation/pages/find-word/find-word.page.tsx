import { queryTypes, useQueryState } from 'next-usequerystate';
import { ChangeEvent, useEffect } from 'react';

import { FindWord as FindWordTemplate } from '@presentation/templates';

import { useDictionarySuggestions } from '@adapter/hooks';

import { debounce } from '@infrastructure/functions';
import { isString } from '@infrastructure/guards';
import { useCopyToClipboard, useRouter, useToast, useUser } from '@infrastructure/hooks';
import { ERoutes } from '@infrastructure/routes';

export const FindWord = () => {
  const toast = useToast();
  const router = useRouter();
  const { copyToClipboard } = useCopyToClipboard();
  const { isLoading, isUserAuthenticated } = useUser();
  const [queryStateWord, setQueryStateWord] = useQueryState('word', queryTypes.string);

  const {
    dictionarySuggestions,
    dictionarySuggestionsError,
    getDictionarySuggestions,
    isDictionarySuggestionsLoading,
  } = useDictionarySuggestions();

  useEffect(() => {
    if (isString(queryStateWord)) {
      getDictionarySuggestions(queryStateWord);
    }
  }, [queryStateWord]);

  const handleCopy = (phrase: string) => () =>
    copyToClipboard(phrase).then(() =>
      toast.info({
        duration: 2000,
        description: 'Copied to clipboard',
      }),
    );

  const handleInputChange = debounce(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setQueryStateWord(value),
    1000,
  );

  const handleAddWordClick = (word: string, meaning: string, exampleSentence: string) => () =>
    router.push({
      pathname: ERoutes.ADD_WORD,
      query: {
        word,
        meaning,
        exampleSentence,
      },
    });

  return (
    <FindWordTemplate
      dictionarySuggestions={dictionarySuggestions}
      dictionarySuggestionsError={dictionarySuggestionsError}
      isDictionarySuggestionsLoading={isDictionarySuggestionsLoading}
      isUserAuthenticated={isUserAuthenticated}
      isUserLoading={isLoading}
      queryStateWord={queryStateWord}
      onAddWordClick={handleAddWordClick}
      onCopy={handleCopy}
      onInputChange={handleInputChange}
    />
  );
};
