import { useCallback, useMemo, useState } from 'react';

import { isError as isErrorTypeGuard, isString } from '@shared/guards';

import { DEFAULT_ERROR_MESSAGE } from '@config/constants';

type TCallback<TParam, TResponse> = (...params: TParam[]) => Promise<TResponse>;

export const useAxios = <TParam, TResponse>(callback: TCallback<TParam, TResponse>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const executeCallbackPromiseWrapper = async (...params: TParam[]) =>
    new Promise<TResponse>((resolve, reject) => {
      callback(...params)
        .then(resolve)
        .catch((_error) => {
          if (isString(_error)) {
            reject(_error);
          }

          if (isErrorTypeGuard(_error)) {
            reject(_error.message);
          }

          reject(DEFAULT_ERROR_MESSAGE);
        });
    });

  const mutate = useCallback((...params: TParam[]) => {
    setIsLoading(true);

    executeCallbackPromiseWrapper(...params)
      .then((response) => {
        setError(null);
        setData(response);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const mutateAsync = useCallback(
    async (...params: TParam[]) =>
      new Promise<TResponse>((resolve, reject) => {
        setIsLoading(true);

        executeCallbackPromiseWrapper(...params)
          .then((_response) => {
            setError(null);
            setData(_response);
            resolve(_response);
          })
          .catch((_error) => {
            setError(_error);
            reject(_error);
          })
          .finally(() => setIsLoading(false));
      }),
    [],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  const isError = useMemo(() => error !== null, [error]);

  return { data, isLoading, error, isError, mutate, mutateAsync, reset };
};
