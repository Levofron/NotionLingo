export const isIsoDate = (string: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string)) {
    return false;
  }

  const date = new Date(string);

  return date instanceof Date && !Number.isNaN(date) && date.toISOString() === string;
};
