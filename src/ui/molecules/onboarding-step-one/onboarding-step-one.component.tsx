import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import {
  Button,
  Flex,
  Link,
  List,
  ListIcon,
  ListItem,
  TabPanel,
  Text,
  TextUnderline,
} from '@ui/atoms';

import { IOnboardingStepOneProps } from './onboarding-step-one.types';

export const OnboardingStepOne: FC<IOnboardingStepOneProps> = (): JSX.Element => (
  <TabPanel mx="auto" p={0} w={{ sm: '500px', md: '600px', lg: '650px' }}>
    <Flex mb="40px">
      <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
        <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
          Create a Notion integration
        </Text>
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          A Notion integration lets you connect information in Notion to other software.
        </Text>
      </Flex>
    </Flex>
    <Flex direction="column" w="100%">
      <Flex direction={{ sm: 'column', md: 'row' }} mb="24px" w="100%">
        <List spacing={5} w="100%">
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              Visit{' '}
              <Link color="red.500" href="https://www.notion.com/my-integrations" target="_blank">
                https://www.notion.com/my-integrations
              </Link>{' '}
              in your browser.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              Click the <TextUnderline>+ New integration</TextUnderline> button.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>Name the integration.</Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>Select a proper workspace.</Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              In the <TextUnderline>Content Capabilities</TextUnderline> section leave only{' '}
              <TextUnderline>Read content</TextUnderline> as the marked option.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              In the <TextUnderline>Use Capabilities</TextUnderline> check{' '}
              <TextUnderline>No user information</TextUnderline> option.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              Click <TextUnderline>Submit</TextUnderline> to create the integration.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <Text>
              On the next page, you’ll find your Notion integration token, also called an API key.
              You’ll need this token. Please click <TextUnderline>Show</TextUnderline> button and
              then <TextUnderline>Copy</TextUnderline>. This action is going to save your token in
              your clipboard.
            </Text>
          </ListItem>
        </List>
      </Flex>
      <Button
        _hover={{
          bg: 'red.500',
        }}
        alignSelf="flex-end"
        bg="red.400"
        h="35px"
        mt="24px"
        variant="no-hover"
        w={{ sm: '75px', lg: '100px' }}
      >
        <Text color="#fff" fontSize="xs" fontWeight="bold">
          NEXT
        </Text>
      </Button>
    </Flex>
  </TabPanel>
);
