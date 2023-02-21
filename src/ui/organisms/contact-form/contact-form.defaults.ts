import { object, string } from 'yup';

export const contactFormValidationSchema = object().shape({
  fullName: string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  message: string().min(10, 'Too Short!').max(500, 'Too Long!').required('Required'),
  email: string().email('Invalid email').required('Required'),
});
