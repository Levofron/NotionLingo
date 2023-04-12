import { useState } from 'react';

import { Login as LoginTemplate } from '@presentation/templates';

import { useToast, useUser } from '@shared/hooks';

export const Login = () => {
  const toast = useToast();
  const { loginViaMagicLink } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (_values: Record<string, string>, reset: () => void) => {
    setIsLoading(true);

    loginViaMagicLink(_values.email)
      .then(() => {
        reset();

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
  };

  return <LoginTemplate isLoading={isLoading} onSubmit={handleSubmit} />;
};
