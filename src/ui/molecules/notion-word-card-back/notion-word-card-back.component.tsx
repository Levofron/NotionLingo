import { Heading } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';

import { speechSynthesisModule } from '@adapter';

import { Button, Card, Flex, VStack } from '@ui/atoms';
import { SelectControl, SliderControl } from '@ui/molecules';

import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
} from '@constants';

import { INotionWordCardBackProps } from './notion-word-card-back.types';

export const NotionWordCardBack: FC<INotionWordCardBackProps> = ({ word }): JSX.Element => {
  const [rate, setRate] = useState(speechSynthesisModule.getRate());
  const [pitch, setPitch] = useState(speechSynthesisModule.getPitch());
  const [volume, setVolume] = useState(speechSynthesisModule.getVolume());
  const [voice, setVoice] = useState(speechSynthesisModule.getVoice()?.name || '');

  const handlePitchChange = (value: number) => {
    setPitch(value);
    speechSynthesisModule.setPitch(value);
    speechSynthesisModule.speak(word);
  };

  const handleRateChange = (value: number) => {
    setRate(value);
    speechSynthesisModule.setRate(value);
    speechSynthesisModule.speak(word);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    speechSynthesisModule.setVolume(value);
    speechSynthesisModule.speak(word);
  };

  const handleVoiceChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setVoice(value);
    speechSynthesisModule.setVoice(value);
    speechSynthesisModule.speak(word);
  };

  const handleResetToDefaults = () => {
    const defaultVoice = speechSynthesisModule.getVoices()[0].name;

    setVoice(defaultVoice);
    setRate(DEFAULT_SPEECH_SYNTHESIS_RATE);
    setPitch(DEFAULT_SPEECH_SYNTHESIS_PITCH);
    setVolume(DEFAULT_SPEECH_SYNTHESIS_VOLUME);

    speechSynthesisModule.setVoice(defaultVoice);
    speechSynthesisModule.setRate(DEFAULT_SPEECH_SYNTHESIS_RATE);
    speechSynthesisModule.setPitch(DEFAULT_SPEECH_SYNTHESIS_PITCH);
    speechSynthesisModule.setVolume(DEFAULT_SPEECH_SYNTHESIS_VOLUME);

    speechSynthesisModule.speak(word);
  };

  return (
    <Card w={{ base: 300, sm: 350, md: 400 }}>
      <Flex flexDirection="column" p={{ base: 3, md: 4 }}>
        <Heading as="h2" mb={{ base: 3, sm: 4, md: 5 }} textAlign="center">
          Edit your settings
        </Heading>
        <VStack spacing={{ base: 3, sm: 4, md: 5 }}>
          <SelectControl label="Voice" value={voice} onChange={handleVoiceChange}>
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
            defaultValue={speechSynthesisModule.getPitch()}
            label="Pitch"
            max={2}
            min={0}
            step={0.1}
            value={pitch}
            onChange={handlePitchChange}
          />
          <SliderControl
            defaultValue={speechSynthesisModule.getRate()}
            label="Rate"
            max={2}
            min={0.1}
            step={0.1}
            value={rate}
            onChange={handleRateChange}
          />
          <SliderControl
            defaultValue={speechSynthesisModule.getVolume()}
            label="Volume"
            max={1}
            min={0}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
          />
          <Button mode="dark" onClick={handleResetToDefaults}>
            Reset to defaults
          </Button>
        </VStack>
      </Flex>
    </Card>
  );
};
