import { renderHook } from '@testing-library/react-hooks';

import { useEventListener } from '@infrastructure/hooks';
import { functionImportTest } from '@infrastructure/jest';

let hackHandler: Function | null = null;
const mouseMoveEvent = { clientX: 100, clientY: 200 };

const mockElement = {
  addEventListener: (_: string, handler: Function) => {
    hackHandler = handler;
  },
  removeEventListener: () => {
    hackHandler = null;
  },
  dispatchEvent: (event: typeof mouseMoveEvent) => {
    if (hackHandler) {
      hackHandler(event);
    }
  },
};

describe('useEventListener hook', () => {
  functionImportTest(useEventListener);

  beforeEach(() => {
    hackHandler = null;
  });

  it('should listen on event ', async () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');

    const { waitForNextUpdate } = renderHook(() =>
      // @ts-expect-error
      useEventListener('mousemove', handler, { element: mockElement }),
    );

    await waitForNextUpdate;
    expect(addEventListenerSpy).toBeCalled();

    mockElement.dispatchEvent(mouseMoveEvent);
    expect(handler).toBeCalledWith(mouseMoveEvent);

    addEventListenerSpy.mockRestore();
  });

  it('has optional target element (defaults to window)', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    renderHook(() => useEventListener('mousemove', handler));

    expect(addEventListenerSpy).toBeCalled();

    addEventListenerSpy.mockRestore();
  });

  it('should not add event listener to window if element is null', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener');

    // @ts-ignore
    renderHook(() => useEventListener('mousemove', handler, { element: null }));

    expect(addEventListenerSpy).not.toBeCalledWith('foo', handler);
  });
});
