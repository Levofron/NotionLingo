import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import {
  ChakraNextLink,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  TextUnderline,
} from '@presentation/atoms';
import { OnboardingStepLayout } from '@presentation/molecules';

import { OnboardingStepTwoProps } from './onboarding-step-two.types';

export const OnboardingStepTwo: FC<OnboardingStepTwoProps> = (props): JSX.Element => (
  <OnboardingStepLayout
    {...props}
    subtitle="A Notion integration lets you connect information in Notion to other software."
    title="Create a Notion integration"
  >
    <Flex direction={{ sm: 'column', md: 'row' }} mb="24px" w="100%">
      <List spacing={{ base: 3, md: 5 }} w="100%">
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text withBalancer>
            Visit{' '}
            <ChakraNextLink href="https://www.notion.com/my-integrations" target="_blank">
              <TextUnderline>https://www.notion.com/my-integrations</TextUnderline>
            </ChakraNextLink>{' '}
            in your browser.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>
            Click the <TextUnderline>+ New integration</TextUnderline> button.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>Name the integration.</Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>Select a proper workspace.</Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>
            In the <TextUnderline>Use Capabilities</TextUnderline> check{' '}
            <TextUnderline>No user information</TextUnderline> option.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
          <Text>
            Click <TextUnderline>Submit</TextUnderline> to create the integration.
          </Text>
        </ListItem>
        <ListItem display="flex">
          <Text withBalancer>
            On the next page, you’ll find your Notion integration token, also called an API key.
            You’ll need this token. Please click <TextUnderline>Show</TextUnderline> button under
            the <TextUnderline>Internal Integration Token</TextUnderline> input label and then{' '}
            <TextUnderline>Copy</TextUnderline>. This action is going to save your token in your
            clipboard.
          </Text>
        </ListItem>
      </List>
    </Flex>
  </OnboardingStepLayout>
);
