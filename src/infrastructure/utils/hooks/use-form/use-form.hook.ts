import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { capitalizeFirstLetter, filterOutObjectKeys, objectKeys } from '@infrastructure/utils';

import { isString } from '../../guards/is-string/is-string.function';
import { fieldToValidatorsMapper } from './use-form.defaults';
import { IUseFormParams, TErrorMessages } from './use-form.types';

const revalidateForm = <TFormData extends object>(newFormState: TFormData) =>
  objectKeys(fieldToValidatorsMapper).reduce((_accumulator, _fieldName) => {
    const fieldValidators = fieldToValidatorsMapper[_fieldName];

    const validator = fieldValidators.find(
      // @ts-expect-error
      (_validator) => !_validator.validate(newFormState[_fieldName]),
    );

    if (!validator) {
      return _accumulator;
    }

    return { ..._accumulator, [_fieldName]: validator?.message || '' };
  }, {} as TErrorMessages<TFormData>);

export const useForm = <TFormData extends object>({ initialValues }: IUseFormParams<TFormData>) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState(initialValues);
  const [errors, setErrors] = useState<TErrorMessages<TFormData> | null>(null);

  const getFormStateWithReformattedData = useCallback(
    () =>
      objectKeys(formState).reduce((_accumulator, _fieldName) => {
        const fieldValue = formState[_fieldName];

        if (!isString(fieldValue)) {
          return { ..._accumulator, [_fieldName]: fieldValue };
        }

        return { ..._accumulator, [_fieldName]: fieldValue.trim() };
      }, formState),
    [formState],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    if (isSubmitted) {
      const validators = fieldToValidatorsMapper[name] || [];

      const filteredErrors = filterOutObjectKeys(errors, name)!;
      const validator = validators.find((_validator) => !_validator.validate(value));

      setErrors({ ...filteredErrors, [name]: validator?.message || '' });
    }

    setFormState((_prevState) => ({ ..._prevState, [name]: value }));
  };

  const reset = (field?: keyof TFormData) => {
    if (!field) {
      setErrors(null);
      setFormState(initialValues);

      return;
    }

    setErrors(filterOutObjectKeys(errors, field));
    setFormState((prevState) => ({ ...prevState, [field]: initialValues[field] }));
  };

  const handleSubmit =
    (onSubmit: (formData: TFormData, event: FormEvent<HTMLDivElement>) => void) =>
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      const newFormState = getFormStateWithReformattedData();
      const newErrors = revalidateForm(newFormState);

      setIsSubmitted(true);
      setErrors(newErrors);
      setFormState(newFormState);

      const isValid = objectKeys(newErrors).length === 0;
      const isEmpty = objectKeys(newFormState).every((_key) => !formState[_key]);

      if (!isValid || isEmpty) {
        return;
      }

      onSubmit(formState, event);
      reset();
    };

  const generateFieldProps = (name: keyof TFormData) => {
    const label = capitalizeFirstLetter(name as string);
    const placeholder = `Your ${label}...`;

    return {
      name,
      label,
      placeholder,
      value: formState[name],
      onChange: handleInputChange,
      errorMessage: errors?.[name],
    };
  };

  return {
    reset,
    formState,
    generateFieldProps,
    onSubmitWrapper: handleSubmit,
  };
};
