import { FC } from 'react';

import { Box, Container } from '@ui/atoms';
import { NavigationItem } from '@ui/molecules';

import { sidebarItems } from './sidebar-content.defaults';
import { ISidebarContentProps } from './sidebar-content.types';

export const SidebarContent: FC<ISidebarContentProps> = ({
  onClose,
  ...restProps
}): JSX.Element => (
  <Box
    borderRight="1px"
    borderRightColor="black"
    css={{
      backdropFilter: 'saturate(180%) blur(5px)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }}
    left={0}
    minH="calc(100vh - 65px)"
    position="fixed"
    top={65}
    transition="3s ease"
    w="full"
    zIndex={9999}
    {...restProps}
  >
    <Container display="flex" flexDirection="column" gap={2} maxW="6xl" mt={2}>
      {sidebarItems.map(({ href, icon, name }) => (
        <NavigationItem key={name} href={href} icon={icon}>
          {name}
        </NavigationItem>
      ))}
    </Container>
  </Box>
);
