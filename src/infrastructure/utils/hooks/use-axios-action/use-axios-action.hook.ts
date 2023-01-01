import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

import { hasOwnProperty } from '@infrastructure/utils';

import { isAxiosError } from './utils/is-axios-error/is-axios-error.function';

type TCallback<TParam, TResponse> = (...params: TParam[]) => Promise<AxiosResponse<TResponse>>;

export const useAxiosAction = <TParam, TResponse>(callback: TCallback<TParam, TResponse>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const execute = useCallback(
    async (...params: TParam[]) => {
      setLoading(true);
      let result: TResponse | null = null;

      try {
        const response = await callback(...params);

        result = response.data;
        setData(result);
      } catch (error) {
        let errorMessage = 'Something went wrong';

        if (isAxiosError(error)) {
          const { data } = error.response!;

          if (data && hasOwnProperty(data, 'message')) {
            errorMessage = data.message as string;
          }

          if (data && hasOwnProperty(data, 'body')) {
            const parsedBody = JSON.parse(data.body as string);

            errorMessage = parsedBody.message;
          }
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }

      return result;
    },
    [callback],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  const refetch = useCallback(async (...params: TParam[]) => {
    reset();

    return execute(...params);
  }, []);

  return { data, loading, error, execute, refetch, reset };
};
