import { FC } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import { Flex, Icon, Tab, TabList } from '@ui/atoms';

import { IOnboardingTabListProps } from './onboarding-tab-list.types';

export const OnboardingTabList: FC<IOnboardingTabListProps> = ({
  activeTabs,
  createNotionIntegrationTabRef,
  selectNotionPageTabRef,
  shareDatabaseIntegrationTabRef,
  validateIntegrationTabRef,
}): JSX.Element => {
  const isCreateIntegrationTabActive = activeTabs.createNotionIntegration;
  const isShareDatabaseIntegrationTabActive = activeTabs.shareDatabaseIntegration;
  const isValidateIntegrationTabActive = activeTabs.validateIntegration;
  const isSelectPageTabActive = activeTabs.selectNotionPage;

  return (
    <TabList display="flex" justifyContent="center" pointerEvents="none">
      <Tab ref={createNotionIntegrationTabRef} w={{ sm: '90px', md: '188px', lg: '225px' }}>
        <Flex
          _before={{
            content: "''",
            width: { sm: '90px', md: '188px', lg: '215px' },
            height: '3px',
            bg: isShareDatabaseIntegrationTabActive ? 'gray.700' : 'gray.200',
            left: { sm: '12px', md: '15px' },
            top: '6px',
            position: 'absolute',
            bottom: '38px',
            transition: 'all .3s ease',
          }}
          align="center"
          direction="column"
          justify="center"
          position="relative"
        >
          <Icon
            as={BsCircleFill}
            color={isCreateIntegrationTabActive ? 'gray.700' : 'gray.300'}
            h={isCreateIntegrationTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            w={isCreateIntegrationTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={shareDatabaseIntegrationTabRef} w={{ sm: '90px', md: '188px', lg: '225px' }}>
        <Flex
          _before={{
            content: "''",
            width: { sm: '90px', md: '188px', lg: '215px' },
            height: '3px',
            bg: isValidateIntegrationTabActive ? 'gray.700' : 'gray.200',
            left: { sm: '12px', md: '12px' },
            top: isShareDatabaseIntegrationTabActive ? '6px' : '4px',
            position: 'absolute',
            bottom: '38px',
            transition: 'all .3s ease',
          }}
          align="center"
          direction="column"
          justify="center"
          position="relative"
        >
          <Icon
            as={BsCircleFill}
            color={isShareDatabaseIntegrationTabActive ? 'gray.700' : 'gray.300'}
            h={isShareDatabaseIntegrationTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            w={isShareDatabaseIntegrationTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={validateIntegrationTabRef} w={{ sm: '90px', md: '188px', lg: '225px' }}>
        <Flex
          _before={{
            content: "''",
            width: { sm: '90px', md: '188px', lg: '215px' },
            height: '3px',
            bg: isSelectPageTabActive ? 'gray.700' : 'gray.200',
            left: { sm: '12px', md: '12px' },
            top: isValidateIntegrationTabActive ? '6px' : '4px',
            position: 'absolute',
            bottom: '38px',
            transition: 'all .3s ease',
          }}
          align="center"
          direction="column"
          justify="center"
          position="relative"
        >
          <Icon
            as={BsCircleFill}
            color={isValidateIntegrationTabActive ? 'gray.700' : 'gray.300'}
            h={isValidateIntegrationTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            w={isValidateIntegrationTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={selectNotionPageTabRef} w={{ sm: '90px', md: '188px', lg: '225px' }}>
        <Flex
          _before={{
            content: "''",
            width: { sm: '90px', md: '188px', lg: '215px' },
            height: '3px',
            left: { sm: '12px', md: '12px' },
            top: { sm: '6px', md: '6px' },
            position: 'absolute',
            bottom: '38px',
            transition: 'all .3s ease',
          }}
          align="center"
          direction="column"
          justify="center"
          position="relative"
        >
          <Icon
            as={BsCircleFill}
            color={isSelectPageTabActive ? 'gray.700' : 'gray.300'}
            h={isSelectPageTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            w={isSelectPageTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
    </TabList>
  );
};
