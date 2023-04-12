import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import { Flex, List, ListIcon, ListItem, Text } from '@presentation/atoms';
import { OnboardingStepLayout } from '@presentation/molecules';

import { useRouter } from '@shared/hooks';

import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@config/constants';

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
  const { redirectToHome } = useRouter();

  return (
    <OnboardingStepLayout
      backButtonLabel="Back to home"
      subtitle="So far we only support specific column names."
      title="Does your Notion database with vocabulary valid?"
      onBackButtonClick={redirectToHome}
      onNextButtonClick={onNextButtonClick}
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
            <Text withBalancer>
              It requires three columns in your database to work. The first is responsible for the{' '}
              <b>word</b>, the second for its <b>meaning</b>, and the third one with the{' '}
              <b>example sentence</b>.
            </Text>
          </ListItem>
          <ListItem display="flex">
            <ListIcon as={BsFillArrowRightCircleFill} mt="5px" />
            <Text withBalancer>
              Please make sure that the database has the column name with word. We support only the
              following names: {supportedWordColumnNamesAsList}
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
              Please make sure that the database has the column name with an example sentence of the
              word. We support only the following names: {supportedExampleSentenceColumnNamesAsList}
            </Text>
          </ListItem>
        </List>
      </Flex>
    </OnboardingStepLayout>
  );
};
