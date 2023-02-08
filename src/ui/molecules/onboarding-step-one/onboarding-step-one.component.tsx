import { useRouter } from 'next/router';
import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Button, Flex, List, ListIcon, ListItem, TabPanel, Text } from '@ui/atoms';

import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@constants';

import { IOnboardingStepOneProps } from './onboarding-step-one.types';
import { mapColumnNamesToComponents } from './utils';

const supportedWordColumnNamesAsList = mapColumnNamesToComponents(SUPPORTED_WORD_COLUMN_NAMES);
const supportedMeaningColumnNamesAsList = mapColumnNamesToComponents(
  SUPPORTED_MEANING_COLUMN_NAMES,
);
const supportedExampleSentenceColumnNamesAsList = mapColumnNamesToComponents(
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
);

export const OnboardingStepOne: FC<IOnboardingStepOneProps> = ({
  onNextButtonClick,
}): JSX.Element => {
  const router = useRouter();

  return (
    <TabPanel mx="auto" p={0} w={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
        <Text
          withBalancer
          color="gray.700"
          fontSize={{ sm: 'xl', md: '2xl' }}
          fontWeight="bold"
          mb="4px"
        >
          Does your Notion database with vocabulary valid?
        </Text>
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          So far we only support specific column names.
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
              <Text withBalancer>
                It requires three columns in your database to work. The first is responsible for the{' '}
                <b>word</b>, the second for its <b>meaning</b>, and the third one with the{' '}
                <b>example sentence</b>.
              </Text>
            </ListItem>
            <ListItem display="flex">
              <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
              <Text withBalancer>
                Please make sure that the database has the column name with word. We support only
                the following names: {supportedWordColumnNamesAsList}
              </Text>
            </ListItem>
            <ListItem display="flex">
              <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
              <Text withBalancer>
                Please make sure that the database has the column name with meaning of the word. We
                support only the following names: {supportedMeaningColumnNamesAsList}
              </Text>
            </ListItem>
            <ListItem display="flex">
              <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
              <Text withBalancer>
                Please make sure that the database has the column name with an example sentence of
                the word. We support only the following names:{' '}
                {supportedExampleSentenceColumnNamesAsList}
              </Text>
            </ListItem>
          </List>
        </Flex>
        <Flex justify="space-between" mt="24px">
          <Button
            leftIcon={<FaChevronLeft size="10px" />}
            variant="secondary"
            onClick={router.back}
          >
            <Text fontSize="xs" fontWeight="bold">
              BACK
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
};
