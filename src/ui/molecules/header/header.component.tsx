import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';

import { Button, Container, Flex, IconButton, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

import { IHeaderProps } from './header.types';

export const Header: FC<IHeaderProps> = ({
  isOpen,
  onClose,
  onOpen,
  ...restProps
}): JSX.Element => {
  const router = useRouter();
  const { isLoading, isUserAuthenticated, loginViaGoogle, logout } = useUser();

  const isHome = router.pathname === ERoutes.HOME;

  const redirectToHome = () => !isHome && router.push(ERoutes.HOME);

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
      p={3}
      pos="fixed"
      top="0"
      w="full"
      zIndex="999"
      {...restProps}
    >
      <Container alignItems="center" as={Flex} justifyContent="space-between" maxW="6xl" p={0}>
        <Flex alignItems="center" gap={{ base: 3, sm: 5 }}>
          <IconButton
            aria-label="Open menu"
            disabled={isLoading}
            icon={isOpen ? <TfiClose size="20px" /> : <FaHamburger size="20px" />}
            onClick={isOpen ? onClose : onOpen}
          />
          <Text
            cursor={isHome ? 'default' : 'pointer'}
            fontFamily="monospace"
            fontSize={{ base: 'xl', sm: '2xl' }}
            fontWeight="bold"
            onClick={redirectToHome}
          >
            NotionLingo
          </Text>
        </Flex>
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          size={{ base: 'sm', sm: 'md', md: 'lg' }}
          width={{ base: '80px', sm: '100px' }}
          onClick={isUserAuthenticated ? logout : loginViaGoogle}
        >
          {isUserAuthenticated ? 'Sign Out' : 'Sign In'}
        </Button>
      </Container>
    </Flex>
  );
};
