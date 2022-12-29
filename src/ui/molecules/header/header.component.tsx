import { FC } from 'react';
import { FiMenu } from 'react-icons/fi';

import { Button, Flex, IconButton } from '@ui/atoms';

import { useUser } from '@infrastructure/utils';

import { IHeaderProps } from './header.types';

export const Header: FC<IHeaderProps> = ({ onOpen, ...restProps }): JSX.Element => {
  const { isUserAuthenticated, loginViaGoogle, logout } = useUser();

  return (
    <Flex
      alignItems="center"
      bg="white"
      borderBottomColor="black"
      borderBottomWidth="1px"
      height="20"
      justifyContent="space-between"
      px={4}
      {...restProps}
    >
      <IconButton
        aria-label="open menu"
        borderColor="black"
        borderRadius="lg"
        icon={<FiMenu />}
        variant="outline"
        onClick={onOpen}
      />
      <Button
        borderColor="black"
        variant="outline"
        width={100}
        onClick={!isUserAuthenticated ? loginViaGoogle : logout}
      >
        {!isUserAuthenticated ? 'Sign In' : 'Sign Out'}
      </Button>
    </Flex>
  );
};
