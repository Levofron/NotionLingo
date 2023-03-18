import { useFormik } from 'formik';
import { useState } from 'react';

import { Button, Card, Container, Flex, Heading } from '@ui/atoms';
import { InputControl, ParticlesBackgroundLayout } from '@ui/molecules';

import { useToast, useUser } from '@infrastructure/utils';

import { loginFormValidationSchema } from './login.defaults';

export const LoginTemplate = (): JSX.Element => {
  const toast = useToast();
  const { loginViaMagicLink } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    isInitialValid: true,
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: true,
    validationSchema: loginFormValidationSchema,
    onSubmit: (_values) => {
      setIsLoading(true);

      loginViaMagicLink(_values.email)
        .then(() => {
          formik.resetForm();

          toast.success({
            description: 'Check your email for the login link!',
            title: 'Email sent',
            onCloseComplete: window.close,
          });
        })
        .catch((_error) =>
          toast.error({
            description: _error.message,
            title: 'Error',
          }),
        )
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <ParticlesBackgroundLayout height="100%">
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
        <Flex alignItems="center" height="100%" justifyContent="center">
          <Card minW={{ base: '300px', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
            <form onSubmit={formik.handleSubmit}>
              <Flex flexDirection="column" gap="3px">
                <Heading fontSize="2xl" mb={2} textAlign="center">
                  Login
                </Heading>
                <InputControl
                  isRequired
                  errorMessage={formik.errors.email}
                  isDisabled={isLoading}
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Flex>
              <Button isLoading={isLoading} mt={2} type="submit" width="full">
                Login
              </Button>
            </form>
          </Card>
        </Flex>
      </Container>
    </ParticlesBackgroundLayout>
  );
};
