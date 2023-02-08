import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Button, Flex, List, ListIcon, ListItem, TabPanel, Text, TextUnderline } from '@ui/atoms';

import { IOnboardingStepThreeProps } from './onboarding-step-three.types';

export const OnboardingStepThree: FC<IOnboardingStepThreeProps> = ({
  onNextButtonClick,
  onPreviousButtonClick,
}): JSX.Element => (
  <TabPanel mx="auto" p={0} w={{ sm: '500px', md: '600px', lg: '650px' }}>
    <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
      <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
        Share a database with your integration
      </Text>
      <Text withBalancer color="gray.400" fontSize="sm" fontWeight="normal">
        Now that you have created an integration, you need to grant it access to a database. To keep
        your information secure, integrations do not have access to any pages or databases in the
        workspace at first. You must share specific pages with an integration in order for the API
        to access those pages.
      </Text>
    </Flex>
    <Flex direction="column" mt={{ base: '25px', md: '40px' }} w="100%">
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
