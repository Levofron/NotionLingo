export const objectKeys = <TObject extends object>(object: TObject) =>
  Object.keys(object) as Array<keyof TObject>;
