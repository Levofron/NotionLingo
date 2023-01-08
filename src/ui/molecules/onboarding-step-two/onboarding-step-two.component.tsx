import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import {
  Button,
  ChakraNextLink,
  Flex,
  List,
  ListIcon,
  ListItem,
  TabPanel,
  Text,
  TextUnderline,
} from '@ui/atoms';

import { IOnboardingStepTwoProps } from './onboarding-step-two.types';

export const OnboardingStepTwo: FC<IOnboardingStepTwoProps> = ({
  onNextButtonClick,
  onPreviousButtonClick,
}): JSX.Element => (
  <TabPanel mx="auto" p={0} w={{ sm: '500px', md: '600px', lg: '650px' }}>
    <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
      <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
        Create a Notion integration
      </Text>
      <Text color="gray.400" fontSize="sm" fontWeight="normal">
        A Notion integration lets you connect information in Notion to other software.
      </Text>
    </Flex>
    <Flex direction="column" mt={{ base: '25px', md: '40px' }} w="100%">
      <Flex direction={{ sm: 'column', md: 'row' }} mb="24px" w="100%">
        <List spacing={{ base: 3, md: 5 }} w="100%">
          <ListItem display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
            <Text>
              Visit{' '}
              <ChakraNextLink href="https://www.notion.com/my-integrations" target="_blank">
                https://www.notion.com/my-integrations
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
              In the <TextUnderline>Content Capabilities</TextUnderline> section leave only{' '}
              <TextUnderline>Read content</TextUnderline> as the marked option.
            </Text>
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
            <Text>
              On the next page, you’ll find your Notion integration token, also called an API key.
              You’ll need this token. Please click <TextUnderline>Show</TextUnderline> button and
              then <TextUnderline>Copy</TextUnderline>. This action is going to save your token in
              your clipboard.
            </Text>
          </ListItem>
        </List>
      </Flex>
      <Flex justify="space-between" mt="24px">
        <Button
          leftIcon={<FaChevronLeft size="10px" />}
          variant="secondary"
          onClick={onPreviousButtonClick}
        >
          <Text fontSize="xs" fontWeight="bold">
            PREV
          </Text>
        </Button>
        <Button rightIcon={<FaChevronRight size="10px" />} onClick={onNextButtonClick}>
          <Text fontSize="xs" fontWeight="bold">
            NEXT
          </Text>
        </Button>
      </Flex>
    </Flex>
  </TabPanel>
);
