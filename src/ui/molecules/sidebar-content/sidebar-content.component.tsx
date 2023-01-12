import { FC, useMemo } from 'react';

import { Box, Container, Flex } from '@ui/atoms';
import { NavigationItem } from '@ui/molecules';

import { useUser } from '@infrastructure/utils';

import { sidebarItems } from './sidebar-content.defaults';
import { ISidebarContentProps } from './sidebar-content.types';

export const SidebarContent: FC<ISidebarContentProps> = ({
  onClose,
  ...restProps
}): JSX.Element => {
  const { user } = useUser();

  const filteredSidebarItems = useMemo(
    () =>
      sidebarItems.filter((_item) =>
        _item.shouldHaveNotionData ? user?.hasNotionData === true : true,
      ),
    [user],
  );

  return (
    <Box
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
      left={0}
      minH={{ base: 'calc(100vh - 66px)', sm: 'calc(100vh - 74px)' }}
      p={3}
      position="fixed"
      top={{ base: 66, md: 74 }}
      transition="3s ease"
      w="full"
      zIndex={9999}
      {...restProps}
    >
      <Container as={Flex} flexDirection="column" gap={3} maxW="6xl" p={0}>
        {filteredSidebarItems.map(({ href, icon, name }) => (
          <NavigationItem key={name} href={href} icon={icon}>
            {name}
          </NavigationItem>
        ))}
      </Container>
    </Box>
  );
};
