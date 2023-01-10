export const objectKeys = <TObject extends object>(object: TObject | null) => {
  if (!object) {
    return [];
  }

  return Object.keys(object) as Array<keyof TObject>;
};
