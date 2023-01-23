import { useState } from 'react';

import { localStorageModule } from '@adapter';

import { tryCatchWrapper, tryParseJson } from '@infrastructure/utils';

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): [T | undefined, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    const item = tryCatchWrapper(
      () => localStorageModule.getItem(key),
      (_error) => console.error('[use-local-storage]', _error),
    );

    return tryParseJson<T>(item ?? '') ?? initialValue;
  });

  const setValue = (value: T) => {
    tryCatchWrapper(
      () => {
        localStorageModule.setItem({ key, value: JSON.stringify(value) });

        setStoredValue(value);
      },
      (_error) => console.error('[use-local-storage]', _error),
    );
  };

  return [storedValue, setValue];
};
