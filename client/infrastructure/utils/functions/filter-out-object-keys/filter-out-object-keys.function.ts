import { isObject } from '@infrastructure/utils';

export const filterOutObjectKeys = <TObject extends object, TObjectKey extends keyof TObject>(
  object: TObject | null,
  keys: TObjectKey | TObjectKey[],
) => {
  if (!isObject(object)) {
    return null;
  }

  const parsedKeys = Array.isArray(keys) ? keys : [keys];

  if (parsedKeys.length === 0) {
    return null;
  }

  const copiedObject = { ...object };

  for (const key of parsedKeys) {
    delete copiedObject[key];
  }

  return copiedObject;
};
