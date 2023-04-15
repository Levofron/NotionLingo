import React, { FC } from 'react';

import { Button, Card, Flex, Heading } from '@presentation/atoms';
import { InputControl } from '@presentation/molecules';

import { LoginFormProps } from './login-form.types';

export const LoginForm: FC<LoginFormProps> = ({
  errors,
  isLoading,
  onBlur,
  onChange,
  onSubmit,
  values,
}) => (
  <Card minW={{ base: '300px', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" gap="3px">
        <Heading fontSize="2xl" mb={2} textAlign="center">
          Login
        </Heading>
        <InputControl
          isRequired
          errorMessage={errors.email}
          isDisabled={isLoading}
          label="Email"
          name="email"
          value={values.email}
          onBlur={onBlur}
          onChange={onChange}
        />
      </Flex>
      <Button isLoading={isLoading} mt={2} type="submit" width="full">
        Login
      </Button>
    </form>
  </Card>
);
