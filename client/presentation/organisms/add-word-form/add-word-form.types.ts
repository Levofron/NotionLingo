import { FormikErrors, useFormik } from 'formik';
import { FormEvent } from 'react';

import { NotionTableColumn } from '@domain/rest/rest.models';

export interface IAddWordFormProps {
  errors: FormikErrors<Record<string, string>>;
  isLoading: boolean;
  onBlur: ReturnType<typeof useFormik>['handleBlur'];
  onChange: ReturnType<typeof useFormik>['handleChange'];
  onSubmit: (event?: FormEvent<HTMLFormElement> | undefined) => void;
  tableColumns: NotionTableColumn[];
  values: Record<string, string>;
}
