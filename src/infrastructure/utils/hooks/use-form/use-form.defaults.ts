import { IValidator } from './use-form.types';

const minLength = (min: number) => (value: string) => !!value && value.length >= min;

const maxLength = (max: number) => (value: string) => !!value && value.length <= max;

const isValidEmail = (email: string) => {
  const re =
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Z\\a-z-]+\.)+[A-Za-z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

const emailRegexValidator: IValidator = {
  message: 'Email is not valid',
  validate: isValidEmail,
};

const minLengthValidator = (min: number): IValidator => ({
  message: `Field must be at least ${min} characters long`,
  validate: minLength(min),
});

const maxLengthValidator = (max: number): IValidator => ({
  message: `Field must be at most ${max} characters long`,
  validate: maxLength(max),
});

export const fieldToValidatorsMapper: Record<string, Array<IValidator>> = {
  name: [minLengthValidator(3), maxLengthValidator(20)],
  message: [minLengthValidator(10), maxLengthValidator(500)],
  email: [minLengthValidator(5), maxLengthValidator(50), emailRegexValidator],
};
