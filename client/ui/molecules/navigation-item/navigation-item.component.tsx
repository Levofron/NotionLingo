import { FC } from 'react';

import { ChakraNextLink, Flex, Icon } from '@ui/atoms';

import { useRouter } from '@infrastructure/utils';

import { INavigationItemProps } from './navigation-item.types';

export const NavigationItem: FC<INavigationItemProps> = ({
  children,
  href,
  icon,
  ...restProps
}) => {
  const { isSamePath } = useRouter();

  if (isSamePath(href)) {
    return null;
  }

  return (
    <ChakraNextLink _focus={{ boxShadow: 'none' }} href={href} style={{ textDecoration: 'none' }}>
      <Flex
        _hover={{
          bg: 'gray.900',
          color: 'gray.50',
        }}
        align="center"
        border="2px solid"
        borderColor="gray.900"
        color="gray.900"
        cursor="pointer"
        p={{ base: 3, sm: 4 }}
        role="group"
        textDecoration="none"
        {...restProps}
      >
        {icon && (
          <Icon
            _groupHover={{
              color: 'gray.50',
            }}
            as={icon}
            color="gray.900"
            fontSize={{ base: 18, sm: 19 }}
            mr={{ base: 3, sm: 4 }}
          />
        )}
        {children}
      </Flex>
    </ChakraNextLink>
  );
};
