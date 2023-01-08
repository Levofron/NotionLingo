import { FC } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';

import { Button, Container, Flex, IconButton, Text } from '@ui/atoms';

import { useUser } from '@infrastructure/utils';

import { IHeaderProps } from './header.types';

export const Header: FC<IHeaderProps> = ({
  isOpen,
  onClose,
  onOpen,
  ...restProps
}): JSX.Element => {
  const { isLoading, isUserAuthenticated, loginViaGoogle, logout } = useUser();

  return (
    <Flex
      alignItems="center"
      as="header"
      borderBottomColor="black"
      borderBottomWidth="1px"
      boxShadow="sm"
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
      p={3}
      pos="fixed"
      top="0"
      w="full"
      zIndex="999"
      {...restProps}
    >
      <Container alignItems="center" as={Flex} justifyContent="space-between" maxW="7xl">
        <Flex alignItems="center" gap={5}>
          <IconButton
            _hover={{
              bg: 'transparent',
              borderColor: 'black',
            }}
            aria-label="open menu"
            borderColor="transparent"
            borderRadius={0}
            icon={!isOpen ? <FaHamburger size="20px" /> : <TfiClose size="20px" />}
            variant="outline"
            onClick={!isOpen ? onOpen : onClose}
          />
          <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold">
            Levofron
          </Text>
        </Flex>
        <Button
          borderColor="black"
          disabled={isLoading}
          isLoading={isLoading}
          variant="primary"
          width={100}
          onClick={!isUserAuthenticated ? loginViaGoogle : logout}
        >
          {!isUserAuthenticated ? 'Sign In' : 'Sign Out'}
        </Button>
      </Container>
    </Flex>
  );
};
