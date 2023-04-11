import { FC } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TfiClose } from 'react-icons/tfi';

import { Button, Container, Flex, Heading, IconButton } from '@presentation/atoms';

import { useRouter, useUser } from '@infrastructure/hooks';

import { IHeaderProps } from './header.types';

export const Header: FC<IHeaderProps> = ({
  isOpen,
  onClose,
  onOpen,
  ...restProps
}): JSX.Element => {
  const { redirectToLogin } = useRouter();
  const { hasSessionUser, logout } = useUser();

  return (
    <Flex
      alignItems="center"
      as="header"
      borderBottom="1px solid"
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
        <Flex alignItems="center" gap={3}>
          <IconButton
            aria-label="Open menu"
            icon={isOpen ? <TfiClose size="20px" /> : <RxHamburgerMenu size="20px" />}
            onClick={isOpen ? onClose : onOpen}
          />
          <Heading as="span" fontSize={{ base: 'xl', sm: '2xl' }}>
            Beta
          </Heading>
        </Flex>
        <Button
          width={{ base: '80px', sm: '100px' }}
          onClick={hasSessionUser ? logout : redirectToLogin}
        >
          {hasSessionUser ? 'Sign Out' : 'Sign In'}
        </Button>
      </Container>
    </Flex>
  );
};