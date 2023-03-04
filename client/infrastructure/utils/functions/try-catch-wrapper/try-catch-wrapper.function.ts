export const tryCatchWrapper = <TData = unknown>(
  toExecute: () => TData,
  onError?: (error: unknown) => void,
): TData | void => {
  try {
    return toExecute();
  } catch (error: unknown) {
    if (onError) {
      onError(error);
    }
  }
};
