import { FC } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';

import { Button, Container, Flex, IconButton } from '@ui/atoms';

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
      borderBottom="2px solid"
      borderColor="gray.900"
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
      p={{ base: 2, sm: 3 }}
      pos="fixed"
      top="0"
      w="full"
      zIndex="999"
      {...restProps}
    >
      <Container alignItems="center" as={Flex} justifyContent="space-between" maxW="6xl" p={0}>
        <IconButton
          aria-label="Open menu"
          disabled={isLoading}
          icon={isOpen ? <TfiClose size="20px" /> : <FaHamburger size="20px" />}
          onClick={isOpen ? onClose : onOpen}
        />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          width={{ base: '80px', sm: '100px' }}
          onClick={isUserAuthenticated ? logout : loginViaGoogle}
        >
          {isUserAuthenticated ? 'Sign Out' : 'Sign In'}
        </Button>
      </Container>
    </Flex>
  );
};
