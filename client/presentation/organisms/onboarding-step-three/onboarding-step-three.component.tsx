import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import { Flex, List, ListIcon, ListItem, Text, TextUnderline } from '@presentation/atoms';
import { OnboardingStepLayout } from '@presentation/molecules';

import { IOnboardingStepThreeProps } from './onboarding-step-three.types';

export const OnboardingStepThree: FC<IOnboardingStepThreeProps> = (props): JSX.Element => (
  <OnboardingStepLayout
    {...props}
    subtitle="Now that you have created an integration, you need to grant it access to a database. To keep
    your information secure, integrations do not have access to any pages or databases in the
    workspace at first. You must share specific pages with an integration in order for the API
    to access those pages."
    title="Share a database with your integration"
  >
    <Flex direction={{ sm: 'column', md: 'row' }} mb="24px" w="100%">
      <List spacing={{ base: 3, md: 5 }} w="100%">
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text withBalancer>
            Go to the database page in your workspace (the one with the vocabulary you want to
            share).
          </Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>
            Click the <TextUnderline>•••</TextUnderline> on the top right corner of the page.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>
            At the bottom of the pop-up, click <TextUnderline>Add connections</TextUnderline>.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>
            Search for and select your integration in the{' '}
            <TextUnderline>Search for connections...</TextUnderline> menu.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <Text>Your integration now has permission to do actions on the database.</Text>
        </ListItem>
      </List>
    </Flex>
  </OnboardingStepLayout>
);
