import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import { Button, Flex, List, ListIcon, ListItem, TabPanel, Text, TextUnderline } from '@ui/atoms';

import { IOnboardingStepThreeProps } from './onboarding-step-three.types';

export const OnboardingStepThree: FC<IOnboardingStepThreeProps> = ({
  onNextButtonClick,
  onPreviousButtonClick,
}): JSX.Element => (
  <TabPanel mx="auto" p={0} w={{ sm: '500px', md: '600px', lg: '650px' }}>
    <Flex mb="40px">
      <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
        <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
          Share a database with your integration
        </Text>
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          Now that you have created an integration, you need to grant it access to a database. To
          keep your information secure, integrations do not have access to any pages or databases in
          the workspace at first. You must share specific pages with an integration in order for the
          API to access those pages.
        </Text>
      </Flex>
    </Flex>
    <Flex direction="column" w="100%">
      <Flex direction={{ sm: 'column', md: 'row' }} mb="24px" w="100%">
        <List spacing={5} w="100%">
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              Go to the database page in your workspace (the one with the vocabulary you want to
              share).
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              Click the <TextUnderline>•••</TextUnderline> on the top right corner of the page.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              At the bottom of the pop-up, click <TextUnderline>Add connections</TextUnderline>.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} />
            <Text>
              Search for and select your integration in the{' '}
              <TextUnderline>Search for connections...</TextUnderline> menu.
            </Text>
          </ListItem>
          <ListItem alignItems="center" display="flex">
            <Text>Your integration now has permission to read the database.</Text>
          </ListItem>
        </List>
      </Flex>
      <Flex justify="space-between">
        <Button
          _hover={{
            bg: 'black',
            color: 'white',
          }}
          alignSelf="flex-end"
          bg="white"
          color="black"
          mt="24px"
          onClick={onPreviousButtonClick}
        >
          <Text fontSize="xs" fontWeight="bold">
            PREV
          </Text>
        </Button>
        <Button alignSelf="flex-end" mt="24px" onClick={onNextButtonClick}>
          <Text fontSize="xs" fontWeight="bold">
            NEXT
          </Text>
        </Button>
      </Flex>
    </Flex>
  </TabPanel>
);
