import { ISpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';

import { isSafari } from '@infrastructure/utils';

import { ISpeechSynthesisSource } from '../../sources/speech-synthesis/speech-synthesis.types';

export const getSpeechSynthesisRepository = (
  speechSynthesisSource: ISpeechSynthesisSource,
): ISpeechSynthesisRepository => ({
  isSupported: () => speechSynthesisSource.isSupported(),
  speak: (options) => {
    if (!speechSynthesisSource.isSupported()) {
      return;
    }

    const allVoices = speechSynthesisSource.getVoices() || [];

    if (isSafari()) {
      const americanVoice = allVoices.find((_voice) => _voice.lang.includes('en-US'));

      return speechSynthesisSource.speak({
        ...options,
        voice: options.voice || americanVoice || allVoices[0],
      });
    }

    const englishVoice = allVoices.find((_voice) => _voice.lang.includes('en-GB'));
    const voice = options.voice || englishVoice || allVoices[0];

    return speechSynthesisSource.speak({ ...options, voice });
  },
  cancel: () => {
    if (!speechSynthesisSource.isSupported()) {
      return;
    }

    return speechSynthesisSource.cancel();
  },
  getVoices: () => {
    if (!speechSynthesisSource.isSupported()) {
      return [];
    }

    return speechSynthesisSource.getVoices();
  },
});
