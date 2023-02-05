import { MutableRefObject, useEffect, useRef } from 'react';

import { isBoolean } from '@infrastructure/utils';

import { IOptions } from './use-event-listener.types';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (this: Window, ev: WindowEventMap[K]) => void,
  options?: IOptions | boolean,
): void {
  const savedHandler: MutableRefObject<Function | undefined> = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isBooleanOptions = isBoolean(options);
    const windowElement = typeof window !== 'undefined' ? window : undefined;

    const addEventListenerOptions = isBooleanOptions ? options : options?.options;
    const element = isBooleanOptions ? windowElement : options?.element || windowElement;

    const isSupported = element?.addEventListener;

    if (!isSupported) return;

    const eventListener = (event: WindowEventMap[K]) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    // @ts-expect-error
    element.addEventListener(eventName, eventListener, addEventListenerOptions);

    return () => {
      // @ts-expect-error
      element.removeEventListener(eventName, eventListener, addEventListenerOptions);
    };
  }, [eventName, options]);
}
