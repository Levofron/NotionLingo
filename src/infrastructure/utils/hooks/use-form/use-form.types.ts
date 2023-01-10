export type TValidateFunction = (fieldName: string) => boolean;

export type TErrorMessages<TFormValues extends object> = Record<keyof TFormValues, string>;

export interface IUseFormParams<TFormValues extends object> {
  initialValues: TFormValues;
}

export interface IValidator {
  message: string;
  validate: TValidateFunction;
}
