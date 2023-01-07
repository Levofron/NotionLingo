import { ChangeEvent, FC } from 'react';

import { restModule } from '@adapter/modules';

import { Button, Flex, TabPanel, Text } from '@ui/atoms';
import { InputControl } from '@ui/molecules';

import { debounce, useAxiosAction } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = ({
  onNextButtonClick,
  onPreviousButtonClick,
}): JSX.Element => {
  const {
    data: setNotionApiTokenData,
    error: setNotionApiTokenError,
    execute: setNotionApiToken,
    loading: isSetNotionApiTokenLoading,
  } = useAxiosAction(restModule.setNotionApiToken);

  const handleInputChange = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await setNotionApiToken(event.target.value);

    if (result) {
      onNextButtonClick();
    }
  }, 1000);

  return (
    <TabPanel mx="auto" w={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex mb="40px">
        <Flex
          align="center"
          direction="column"
          justify="center"
          mx="auto"
          textAlign="center"
          w="80%"
        >
          <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
            Validate your integration
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="normal">
            Paste your copied integration token below to validate your integration.
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" w="100%">
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
        _hover={{
          bg: 'black',
          color: 'white',
        }}
        alignSelf="flex-end"
        bg="white"
        color="black"
        isDisabled={isSetNotionApiTokenLoading || !!setNotionApiTokenData}
        mt="48px"
        onClick={onPreviousButtonClick}
      >
        <Text fontSize="xs" fontWeight="bold">
          PREV
        </Text>
      </Button>
    </TabPanel>
  );
};
