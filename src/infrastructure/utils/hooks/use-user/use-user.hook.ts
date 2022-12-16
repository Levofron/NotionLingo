import { useContext } from 'react';

import { UserContext } from '@infrastructure';

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext is unavailable, make sure you are using UserProvider context.');
  }

  return userContext;
};
