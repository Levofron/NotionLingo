import { ISpeakOptions } from '@domain/speech-synthesis/speech-synthesis.types';

export interface ISpeechSynthesisSource {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  speak: (options: ISpeakOptions) => void;
}
