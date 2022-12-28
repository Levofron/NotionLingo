import { FC } from 'react';

import { Box, CloseButton, Flex, Text } from '@ui/atoms';
import { NavigationItem } from '@ui/molecules';

import { sidebarItems } from './sidebar-content.defaults';
import { ISidebarContentProps } from './sidebar-content.types';

export const SidebarContent: FC<ISidebarContentProps> = ({
  onClose,
  ...restProps
}): JSX.Element => (
  <Box
    bg="white"
    borderRight="1px"
    borderRightColor="black"
    h="full"
    pos="fixed"
    transition="3s ease"
    w="full"
    {...restProps}
  >
    <Flex alignItems="center" h="20" justifyContent="space-between" mx="8">
      <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold">
        Levofron
      </Text>
      <CloseButton onClick={onClose} />
    </Flex>
    {sidebarItems.map(({ href, icon, name }) => (
      <NavigationItem key={name} href={href} icon={icon}>
        {name}
      </NavigationItem>
    ))}
  </Box>
);
