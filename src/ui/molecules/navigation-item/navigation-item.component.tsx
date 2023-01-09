import { useRouter } from 'next/router';
import { FC } from 'react';

import { ChakraNextLink, Flex, Icon } from '@ui/atoms';

import { INavigationItemProps } from './navigation-item.types';

export const NavigationItem: FC<INavigationItemProps> = ({
  children,
  href,
  icon,
  ...restProps
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  if (isActive) {
    return null;
  }

  return (
    <ChakraNextLink _focus={{ boxShadow: 'none' }} href={href} style={{ textDecoration: 'none' }}>
      <Flex
        _hover={{
          bg: 'black',
          color: 'white',
        }}
        align="center"
        border="1px solid black"
        color="black"
        cursor="pointer"
        p="4"
        role="group"
        {...restProps}
      >
        {icon && (
          <Icon
            _groupHover={{
              color: 'white',
            }}
            as={icon}
            color="black"
            fontSize="16"
            mr="4"
          />
        )}
        {children}
      </Flex>
    </ChakraNextLink>
  );
};
