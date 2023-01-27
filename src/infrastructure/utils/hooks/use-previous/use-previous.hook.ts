import { useEffect, useRef } from 'react';

export const usePrevious = <TValue>(value: TValue) => {
  const ref = useRef<TValue>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
