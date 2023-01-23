import { Heading } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';

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
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
} from '@constants';

import { INotionWordCardBackProps } from './notion-word-card-back.types';

export const NotionWordCardBack: FC<INotionWordCardBackProps> = (): JSX.Element => {
  const [localStorageRate, setLocalStorageRate] = useLocalStorage(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
    DEFAULT_SPEECH_SYNTHESIS_RATE,
  );
  const [localStoragePitch, setLocalStoragePitch] = useLocalStorage(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
    DEFAULT_SPEECH_SYNTHESIS_PITCH,
  );
  const [localStorageVolume, setLocalStorageVolume] = useLocalStorage(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
    DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  );
  const [localStorageVoice, setLocalStorageVoice] = useLocalStorage<SpeechSynthesisVoice>(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
  );

  const handlePitchChange = (value: number) => {
    speechSynthesisModule.cancel();
    speechSynthesisModule.speak({
      pitch: value,
      text: 'Hello, world!',
      voice: localStorageVoice,
      rate: Number(localStorageRate),
      volume: Number(localStorageVolume),
    });

    setLocalStoragePitch(value);
  };

  const handleRateChange = (value: number) => {
    console.log(localStorageVoice);

    speechSynthesisModule.cancel();
    speechSynthesisModule.speak({
      rate: value,
      text: 'Hello, world!',
      voice: localStorageVoice,
      pitch: Number(localStoragePitch),
      volume: Number(localStorageVolume),
    });

    setLocalStorageRate(value);
  };

  const handleVolumeChange = (value: number) => {
    speechSynthesisModule.cancel();
    speechSynthesisModule.speak({
      volume: value,
      text: 'Hello, world!',
      voice: localStorageVoice,
      rate: Number(localStorageRate),
      pitch: Number(localStoragePitch),
    });

    setLocalStorageVolume(value);
  };

  const handleVoiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const foundVoice = speechSynthesisModule
      .getVoices()
      .find((_voice) => _voice.name === event.target.value);

    speechSynthesisModule.cancel();
    speechSynthesisModule.speak({
      voice: foundVoice,
      text: 'Hello, world!',
      rate: Number(localStorageRate),
      pitch: Number(localStoragePitch),
      volume: Number(localStorageVolume),
    });

    const reassignedVoice = {
      name: foundVoice?.name,
      lang: foundVoice?.lang,
      default: foundVoice?.default,
      voiceURI: foundVoice?.voiceURI,
      localService: foundVoice?.localService,
    };

    // @ts-expect-error
    setLocalStorageVoice(reassignedVoice);
  };

  return (
    <Card w={{ base: 300, sm: 350, md: 400 }}>
      <Flex flexDirection="column" p={{ base: 2, sm: 3, md: 4 }}>
        <Heading as="h2" fontSize="xl" mb={5} textAlign="center">
          Edit your settings
        </Heading>
        <VStack spacing={5}>
          <SelectControl label="Voice" value={localStorageVoice?.name} onChange={handleVoiceChange}>
            <option key="placeholder" disabled>
              Select voice...
            </option>
            {speechSynthesisModule.getVoices().map((_voice) => (
              <option key={_voice.name} value={_voice.name}>
                {_voice.name}
              </option>
            ))}
          </SelectControl>
          <SliderControl
            defaultValue={Number(localStoragePitch)}
            label="Pitch"
            max={2}
            min={0}
            step={0.1}
            value={Number(localStoragePitch)}
            onChange={handlePitchChange}
          />
          <SliderControl
            defaultValue={Number(localStorageRate)}
            label="Rate"
            max={10}
            min={0.1}
            step={0.1}
            value={Number(localStorageRate)}
            onChange={handleRateChange}
          />
          <SliderControl
            defaultValue={Number(localStorageVolume)}
            label="Volume"
            max={1}
            min={0}
            step={0.1}
            value={Number(localStorageVolume)}
            onChange={handleVolumeChange}
          />
          <Button mode="dark">Reset to defaults</Button>
        </VStack>
      </Flex>
    </Card>
  );
};
