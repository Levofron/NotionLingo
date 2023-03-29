export const isObject = (object: unknown): object is object =>
  typeof object === 'object' && object !== null && !Array.isArray(object);
