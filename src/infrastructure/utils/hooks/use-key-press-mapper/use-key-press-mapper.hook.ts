import { debounce } from '@infrastructure/utils';

import { useEventListener } from '../use-event-listener/use-event-listener.hook';
import { IKeyMapper } from './use-key-press-mapper.types';

export const useKeyPressMapper = (keyMappers: IKeyMapper[], isBlocked?: boolean) => {
  const handleKeyPress = debounce((event: KeyboardEvent) => {
    event.preventDefault();

    if (isBlocked) {
      return;
    }

    const foundKeyMapper = keyMappers.find((_keyMapper) => _keyMapper.key === event.code);

    if (foundKeyMapper) {
      foundKeyMapper.callback();
    }
  }, 300);

  useEventListener('keypress', handleKeyPress);
};
