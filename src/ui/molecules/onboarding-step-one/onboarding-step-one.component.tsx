import { useRouter } from 'next/router';
import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

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
            Does your Notion database with vocabulary valid?
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="normal">
            So far we only support specific column names.
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
                It requires three columns in your database to work. The first is responsible for the
                word, the second for its meaning, and the third for the example of use.
              </Text>
            </ListItem>
            <ListItem alignItems="center" display="flex">
              <ListIcon as={BsFillArrowRightCircleFill} />
              <Text>
                Please make sure that the database has the column name with word. We support only
                the following names: {supportedWordColumnNamesAsList}
              </Text>
            </ListItem>
            <ListItem alignItems="center" display="flex">
              <ListIcon as={BsFillArrowRightCircleFill} />
              <Text>
                Please make sure that the database has the column name with meaning of the word. We
                support only the following names: {supportedMeaningColumnNamesAsList}
              </Text>
            </ListItem>
            <ListItem alignItems="center" display="flex">
              <ListIcon as={BsFillArrowRightCircleFill} />
              <Text>
                Please make sure that the database has the column name with an example sentence of
                the word. We support only the following names:{' '}
                {supportedExampleSentenceColumnNamesAsList}
              </Text>
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
            leftIcon={<MdOutlineArrowBackIosNew size="12px" />}
            mt="24px"
            onClick={router.back}
          >
            <Text fontSize="xs" fontWeight="bold">
              BACK
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
};
