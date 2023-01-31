import { debounce } from '@infrastructure/utils';

import { useEventListener } from '../use-event-listener/use-event-listener.hook';
import { IKeyMapper } from './use-key-press-mapper.types';

export const useKeyPressMapper = (keyMappers: IKeyMapper[], blocked?: boolean) => {
  const handleKeyPress = debounce((event: KeyboardEvent) => {
    event.preventDefault();

    if (blocked) {
      return;
    }

    const keyMapper = keyMappers.find((keyMapper) => keyMapper.key === event.code);

    if (keyMapper) {
      keyMapper.callback();
    }
  }, 500);

  useEventListener('keypress', handleKeyPress);
};
