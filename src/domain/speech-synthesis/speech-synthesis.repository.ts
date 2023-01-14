import { ISpeakOptions } from './speech-synthesis.types';

export interface ISpeechSynthesisRepository {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  speak: (options: ISpeakOptions) => void;
}
