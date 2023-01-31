export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean' || value instanceof Boolean;
