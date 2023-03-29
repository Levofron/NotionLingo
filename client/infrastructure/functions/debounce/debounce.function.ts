export const debounce = <TParams>(callback: (...params: TParams[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: TParams[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
