import { isString, tryCatchWrapper } from '@infrastructure/utils';

export function tryParseJson<T = unknown>(jsonString: string | null | undefined): T | null {
  if (!isString(jsonString)) {
    return null;
  }

  return tryCatchWrapper(() => JSON.parse(jsonString)) ?? null;
}
