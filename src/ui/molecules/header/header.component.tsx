import { useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
import { FiMenu } from 'react-icons/fi';

import { Avatar, Flex, IconButton, Text } from '@ui/atoms';

import { IHeaderProps } from './header.types';

export const Header: FC<IHeaderProps> = ({ onOpen, ...restProps }): JSX.Element => (
  <Flex
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    borderBottomWidth="1px"
    height="20"
    justifyContent="space-between"
    px={4}
    {...restProps}
  >
    <IconButton aria-label="open menu" icon={<FiMenu />} variant="outline" onClick={onOpen} />
    <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold">
      Levofron
    </Text>
    <Avatar
      size="sm"
      src={
        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
      }
    />
  </Flex>
);
