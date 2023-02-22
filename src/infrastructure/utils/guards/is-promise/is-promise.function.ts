import { isFunction, isObject } from '@infrastructure/utils';

export const isPromise = (functionToCheck: unknown): functionToCheck is Promise<unknown> =>
  // @ts-expect-error
  (isFunction(functionToCheck) || isObject(functionToCheck)) && isFunction(functionToCheck.then);
