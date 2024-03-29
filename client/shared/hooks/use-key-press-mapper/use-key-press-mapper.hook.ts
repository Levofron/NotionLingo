import { debounce } from '@shared/functions';

import { useEventListener } from '../use-event-listener/use-event-listener.hook';
import { AvailableKey } from './use-key-press-mapper.types';

export const useKeyPressMapper = (
  keyMappers: [AvailableKey | AvailableKey[], () => void][],
  isBlocked?: boolean,
) => {
  const handleKeyPress = debounce((event: KeyboardEvent) => {
    event.preventDefault();

    if (isBlocked || !keyMappers?.length) {
      return;
    }

    const foundKeyMapper = keyMappers.find(([keys]) =>
      Array.isArray(keys) ? keys.includes(event.code as AvailableKey) : keys === event.code,
    );

    if (foundKeyMapper && foundKeyMapper.length > 0) {
      foundKeyMapper[1]();
    }
  }, 300);

  useEventListener('keypress', handleKeyPress);
};
