import { FC } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import { Flex, Icon, Tab, TabList } from '@ui/atoms';

import { IOnboardingTabListProps } from './onboarding-tab-list.types';

const width = { sm: '72px', md: '150px', lg: '180px' };

export const OnboardingTabList: FC<IOnboardingTabListProps> = ({
  activeTabs,
  createNotionIntegrationTabRef,
  selectNotionDatabaseTabRef,
  shareDatabaseIntegrationTabRef,
  validateIntegrationTabRef,
  verifyDatabaseTabRef,
}): JSX.Element => {
  const isCreateIntegrationTabActive = activeTabs.createNotionIntegration;
  const isShareDatabaseIntegrationTabActive = activeTabs.shareDatabaseIntegration;
  const isValidateIntegrationTabActive = activeTabs.validateIntegration;
  const isSelectPageTabActive = activeTabs.selectNotionDatabase;
  const isVerifyDatabaseTabActive = activeTabs.verifyDatabase;

  return (
    <TabList display="flex" justifyContent="center" pointerEvents="none">
      <Tab ref={verifyDatabaseTabRef} width={width}>
        <Flex
          _before={{
            content: "''",
            width,
            height: '3px',
            bg: isCreateIntegrationTabActive ? 'gray.700' : 'gray.200',
            left: '12px',
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
            color={isVerifyDatabaseTabActive ? 'gray.700' : 'gray.300'}
            height={isVerifyDatabaseTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            width={isVerifyDatabaseTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={createNotionIntegrationTabRef} width={width}>
        <Flex
          _before={{
            content: "''",
            width,
            height: '3px',
            bg: isShareDatabaseIntegrationTabActive ? 'gray.700' : 'gray.200',
            left: '12px',
            top: isCreateIntegrationTabActive ? '6px' : '4px',
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
            height={isCreateIntegrationTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            width={isCreateIntegrationTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={shareDatabaseIntegrationTabRef} width={width}>
        <Flex
          _before={{
            content: "''",
            width,
            height: '3px',
            bg: isValidateIntegrationTabActive ? 'gray.700' : 'gray.200',
            left: '12px',
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
            height={isShareDatabaseIntegrationTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            width={isShareDatabaseIntegrationTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={validateIntegrationTabRef} width={width}>
        <Flex
          _before={{
            content: "''",
            width,
            height: '3px',
            bg: isSelectPageTabActive ? 'gray.700' : 'gray.200',
            left: '12px',
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
            height={isValidateIntegrationTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            width={isValidateIntegrationTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
      <Tab ref={selectNotionDatabaseTabRef} width={width}>
        <Flex
          _before={{
            content: "''",
            width,
            height: '3px',
            left: '12px',
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
            height={isSelectPageTabActive ? '16px' : '12px'}
            mb="8px"
            transition="all .3s ease"
            width={isSelectPageTabActive ? '16px' : '12px'}
            zIndex={1}
          />
        </Flex>
      </Tab>
    </TabList>
  );
};
