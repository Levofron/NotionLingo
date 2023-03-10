import { FC, useMemo } from 'react';

import { Box, Flex } from '@ui/atoms';
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
      height={{ base: 'calc(100vh - 58px)', sm: 'calc(100vh - 66px)', md: 'calc(100vh - 74px)' }}
      left={0}
      p={{ base: 2, sm: 3 }}
      position="fixed"
      top={{ base: 58, sm: 66, md: 74 }}
      w="full"
      zIndex={20}
      {...restProps}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        gap={{ base: 3, sm: 4 }}
        justifyContent="center"
        margin="0 auto"
        maxW="6xl"
        p={0}
        pt={10}
      >
        {filteredSidebarItems.map(({ href, name }) => (
          <NavigationItem key={name} href={href}>
            {name}
          </NavigationItem>
        ))}
      </Flex>
    </Box>
  );
};
