const _hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwnProperty = <TObject extends object, TProperty extends PropertyKey>(
  object: TObject,
  property: TProperty,
): object is TObject & Record<TProperty, unknown> => _hasOwnProperty.call(object, property);
