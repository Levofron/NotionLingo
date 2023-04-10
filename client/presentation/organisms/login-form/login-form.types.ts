import { FormikErrors, useFormik } from 'formik';
import { FormEvent } from 'react';

export interface ILoginFormProps {
  errors: FormikErrors<Record<string, string>>;
  isLoading: boolean;
  onBlur: ReturnType<typeof useFormik>['handleBlur'];
  onChange: ReturnType<typeof useFormik>['handleChange'];
  onSubmit: (event?: FormEvent<HTMLFormElement> | undefined) => void;
  values: Record<string, string>;
}
