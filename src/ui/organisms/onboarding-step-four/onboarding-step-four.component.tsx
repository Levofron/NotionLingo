import { ChangeEvent, FC } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import { Button, Flex, Icon, TabPanel, Text } from '@ui/atoms';
import { InputControl } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { debounce, useAxios } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = ({
  onNextButtonClick,
  onPreviousButtonClick,
}): JSX.Element => {
  const {
    data: setNotionApiTokenData,
    error: setNotionApiTokenError,
    isLoading: isSetNotionApiTokenLoading,
    mutateAsync: mutateAsyncSetNotionApiToken,
  } = useAxios(restModule.setNotionApiToken);

  const handleInputChange = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await mutateAsyncSetNotionApiToken(event.target.value);

    if (result) {
      onNextButtonClick();
    }
  }, 1000);

  return (
    <TabPanel mx="auto" width={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
        <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
          Validate your integration
        </Text>
        <Text color="gray.400" fontWeight="normal">
          Paste your copied integration token below to validate your integration.
        </Text>
      </Flex>
      <Flex direction="column" mt={{ base: '25px', md: '40px' }} w="100%">
        <InputControl
          isRequired
          errorMessage={setNotionApiTokenError || undefined}
          isDisabled={isSetNotionApiTokenLoading || !!setNotionApiTokenData}
          isLoading={isSetNotionApiTokenLoading}
          label="Integration token"
          name="integrationToken"
          placeholder="Your integration token"
          onChange={handleInputChange}
        />
      </Flex>
      <Button
        isDisabled={isSetNotionApiTokenLoading || !!setNotionApiTokenData}
        leftIcon={<Icon as={FaChevronLeft} fontSize={{ base: 11, sm: 13, md: 14 }} />}
        mode="light"
        mt="48px"
        onClick={onPreviousButtonClick}
      >
        Back
      </Button>
    </TabPanel>
  );
};
