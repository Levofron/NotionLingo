import { useFormik } from 'formik';
import { FC } from 'react';

import { Container, Flex } from '@presentation/atoms';
import { ParticlesBackgroundLayout } from '@presentation/molecules';
import { LoginForm, SidebarWithHeader } from '@presentation/organisms';

import { initialFormValues, loginFormValidationSchema } from './login.defaults';
import { LoginProps } from './login.types';

export const Login: FC<LoginProps> = ({ isLoading, onSubmit }) => {
  const formik = useFormik({
    isInitialValid: true,
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: true,
    initialValues: initialFormValues,
    validationSchema: loginFormValidationSchema,
    onSubmit: (_values) => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const reset = () => formik.setValues(initialFormValues);

      onSubmit(_values, reset);
    },
  });

  return (
    <>
      <SidebarWithHeader />
      <ParticlesBackgroundLayout height="100%">
        <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
          <Flex alignItems="center" height="100%" justifyContent="center">
            <LoginForm
              errors={formik.errors}
              isLoading={isLoading}
              values={formik.values}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onSubmit={formik.handleSubmit}
            />
          </Flex>
        </Container>
      </ParticlesBackgroundLayout>
    </>
  );
};
