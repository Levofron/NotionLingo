import { FC } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Button, Flex, Icon, TabPanel, Text } from '@presentation/atoms';

import { OnboardingStepLayoutProps } from './onboarding-step-layout.types';

export const OnboardingStepLayout: FC<OnboardingStepLayoutProps> = ({
  backButtonLabel = 'Back',
  children,
  onBackButtonClick,
  onNextButtonClick,
  subtitle,
  title,
}): JSX.Element => (
  <TabPanel mx="auto" p={0} width={{ sm: '500px', md: '600px', lg: '650px' }}>
    <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
      <Text
        withBalancer
        color="gray.700"
        fontSize={{ sm: 'xl', md: '2xl' }}
        fontWeight="bold"
        mb="4px"
      >
        {title}
      </Text>
      <Text color="gray.400" fontWeight="normal">
        {subtitle}
      </Text>
    </Flex>
    <Flex direction="column" mt={{ base: '25px', md: '40px' }} w="100%">
      {children}
      {onBackButtonClick || onNextButtonClick ? (
        <Flex justify="space-between" mt="24px">
          {onBackButtonClick ? (
            <Button
              leftIcon={<Icon as={FaChevronLeft} fontSize={{ base: 11, sm: 13, md: 14 }} />}
              mode="light"
              onClick={onBackButtonClick}
            >
              {backButtonLabel}
            </Button>
          ) : null}
          {onNextButtonClick ? (
            <Button
              rightIcon={<Icon as={FaChevronRight} fontSize={{ base: 11, sm: 13, md: 14 }} />}
              onClick={onNextButtonClick}
            >
              Next
            </Button>
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  </TabPanel>
);

export default OnboardingStepLayout;
