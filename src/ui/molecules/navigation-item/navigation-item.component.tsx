import { FC } from 'react';

import { ChakraNextLink, Flex, Icon } from '@ui/atoms';

import { INavigationItemProps } from './navigation-item.types';

export const NavigationItem: FC<INavigationItemProps> = ({
  children,
  href,
  icon,
  ...restProps
}): JSX.Element => (
  <ChakraNextLink _focus={{ boxShadow: 'none' }} href={href} style={{ textDecoration: 'none' }}>
    <Flex
      _hover={{
        bg: 'red.400',
        color: 'white',
      }}
      align="center"
      borderRadius="lg"
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
          fontSize="16"
          mr="4"
        />
      )}
      {children}
    </Flex>
  </ChakraNextLink>
);
