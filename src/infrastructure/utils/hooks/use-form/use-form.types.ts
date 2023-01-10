export type TValidateFunction = (fieldName: string) => boolean;

export type TErrorMessages<TFormData extends object> = Record<keyof TFormData, string>;

export interface IUseFormParams<TFormData extends object> {
  initialValues: TFormData;
}

export interface IValidator {
  message: string;
  validate: TValidateFunction;
}
