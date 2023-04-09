import { FormikErrors, useFormik } from 'formik';
import { FormEvent } from 'react';

import { TNotionTableColumn } from '@domain/rest/rest.types';

export interface IAddWordFormProps {
  errors: FormikErrors<Record<string, string>>;
  isLoading: boolean;
  onBlur: ReturnType<typeof useFormik>['handleBlur'];
  onChange: ReturnType<typeof useFormik>['handleChange'];
  onSubmit: (event?: FormEvent<HTMLFormElement> | undefined) => void;
  tableColumns: TNotionTableColumn[];
  values: Record<string, string>;
}
