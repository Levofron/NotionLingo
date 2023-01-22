import { Heading } from '@chakra-ui/react';
import { FC } from 'react';

import { speechSynthesisModule } from '@adapter';

import { Button, Card, Flex, VStack } from '@ui/atoms';
import { SelectControl, SliderControl } from '@ui/molecules';

import { useLocalStorage } from '@infrastructure/utils';

import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
} from '@constants';

import { INotionWordCardBackProps } from './notion-word-card-back.types';

export const NotionWordCardBack: FC<INotionWordCardBackProps> = (): JSX.Element => {
  const [localStorageRate] = useLocalStorage(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
    DEFAULT_SPEECH_SYNTHESIS_RATE,
  );
  const [localStoragePitch] = useLocalStorage(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
    DEFAULT_SPEECH_SYNTHESIS_PITCH,
  );
  const [localStorageVolume] = useLocalStorage(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
    DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  );

  console.log(localStorageRate, localStoragePitch, localStorageVolume);

  return (
    <Card w={{ base: 300, sm: 350, md: 400 }}>
      <Flex flexDirection="column" p={{ base: 2, sm: 3, md: 4 }}>
        <Heading as="h2" fontSize="xl" mb={5} textAlign="center">
          Edit your settings
        </Heading>
        <VStack as="form" spacing={5}>
          <SelectControl label="Select voice">
            <option key="placeholder" disabled>
              Select voice...
            </option>
            {speechSynthesisModule.getVoices().map((_voice) => (
              <option key={_voice.name} value={_voice.name}>
                {_voice.name}
              </option>
            ))}
          </SelectControl>
          <SliderControl label="Select pitch" max={2} min={0} step={0.1} />
          <SliderControl label="Select rate" max={10} min={0.1} step={0.1} />
          <SliderControl label="Select volume" max={1} min={0} step={0.1} />
          <Button mode="dark" type="submit" width="full">
            Save settings
          </Button>
        </VStack>
      </Flex>
    </Card>
  );
};
