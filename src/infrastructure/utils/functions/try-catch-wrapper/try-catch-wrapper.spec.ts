import { functionImportTest } from '@infrastructure/utils';

import { tryCatchWrapper } from './try-catch-wrapper.function';

describe('tryCatchWrapper function', () => {
  functionImportTest(tryCatchWrapper);

  it('should call onError callback when an error occurs', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const func = () => {
      throw new Error('test error');
    };

    const onError = jest.fn();

    tryCatchWrapper(func, onError);

    expect(onError).toHaveBeenCalled();
  });

  it('should not invoke onError function when it not passed', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const func = () => {
      throw new Error('test error');
    };

    expect(tryCatchWrapper(func)).not.toBeDefined();
  });

  it('should call passed function when an error does not occur', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const func = () => 5;

    expect(tryCatchWrapper(func)).toEqual(5);
  });
});
