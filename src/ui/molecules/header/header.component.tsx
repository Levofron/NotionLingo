import { FC } from 'react';
import { FiMenu } from 'react-icons/fi';

import { Avatar, Flex, IconButton, Text } from '@ui/atoms';

import { useUser } from '@infrastructure/utils';

import { IHeaderProps } from './header.types';

export const Header: FC<IHeaderProps> = ({ onOpen, ...restProps }): JSX.Element => {
  const { user } = useUser();

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
      <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold">
        Levofron
      </Text>
      <Avatar border="1px solid black" size="sm" src={user?.avatarUrl} />
    </Flex>
  );
};
