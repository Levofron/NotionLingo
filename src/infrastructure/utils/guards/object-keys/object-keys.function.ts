import { isObject } from '@infrastructure/utils';

export const objectKeys = <TObject extends object>(object: TObject | null) => {
  if (!isObject(object)) {
    return [];
  }

  return Object.keys(object) as Array<keyof TObject>;
};
