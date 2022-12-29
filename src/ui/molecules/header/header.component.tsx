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
      {!isUserAuthenticated ? (
        <Button
          _hover={{
            bg: 'red.500',
          }}
          bg="red.400"
          color="white"
          width={100}
          onClick={loginViaGoogle}
        >
          Sign In
        </Button>
      ) : (
        <Button
          _hover={{
            bg: 'red.500',
          }}
          bg="red.400"
          color="white"
          width={100}
          onClick={logout}
        >
          Sign Out
        </Button>
      )}
    </Flex>
  );
};
