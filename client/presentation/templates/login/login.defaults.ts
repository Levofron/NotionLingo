import { object, string } from 'yup';

export const loginFormValidationSchema = object().shape({
  email: string().email('Invalid email').required('Required'),
});

export const initialFormValues = {
  email: '',
};
