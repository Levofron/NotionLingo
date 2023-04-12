import { motion } from 'framer-motion';
import { FC } from 'react';

import { ChakraNextLink, Heading } from '@presentation/atoms';

import { useRouter } from '@shared/hooks';

import { INavigationItemProps } from './navigation-item.types';

export const NavigationItem: FC<INavigationItemProps> = ({ children, href }) => {
  const { isSamePath } = useRouter();

  if (isSamePath(href)) {
    return null;
  }

  return (
    <ChakraNextLink _focus={{ boxShadow: 'none' }} href={href}>
      <Heading
        _hover={{
          transform: 'scale(1.1)',
        }}
        as={motion.span}
        color="gray.900"
        cursor="pointer"
        display="block"
        fontSize={{ base: '3xl', sm: '4xl' }}
        role="group"
        textAlign="center"
        textDecoration="none"
        transition="all .3s ease"
        userSelect="none"
      >
        {children}
      </Heading>
    </ChakraNextLink>
  );
};
