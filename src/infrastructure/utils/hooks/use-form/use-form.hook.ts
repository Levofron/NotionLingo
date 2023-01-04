import { ChangeEvent, FormEvent, useState } from 'react';

import { capitalizeFirstLetter } from '@infrastructure/utils';

import { IUseFormParams } from './use-form.types';

export const useForm = <TFormData extends object>({ initialValues }: IUseFormParams<TFormData>) => {
  const [formState, setFormState] = useState(initialValues);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit =
    (onSubmit: (formData: TFormData, event: FormEvent<HTMLDivElement>) => void) =>
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      onSubmit(formState, event);
    };

  const generateFieldProps = (name: keyof TFormData) => {
    const label = capitalizeFirstLetter(name as string);
    const placeholder = `Your ${label}`;

    return {
      name,
      label,
      placeholder,
      value: formState[name],
      onChange: handleInputChange,
    };
  };

  const reset = (field?: keyof TFormData) => {
    if (!field) {
      setFormState(initialValues);

      return;
    }

    setFormState((prevState) => ({ ...prevState, [field]: initialValues[field] }));
  };

  return {
    reset,
    formState,
    generateFieldProps,
    onSubmitWrapper: handleSubmit,
  };
};
