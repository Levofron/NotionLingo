import { ISpeakOptions } from './speech-synthesis.types';

export interface ISpeechSynthesisRepository {
  cancel: () => void;
  getPitch: () => number;
  getRate: () => number;
  getVoices: () => SpeechSynthesisVoice[];
  getVolume: () => number;
  isSupported: () => boolean;
  speak: (options: ISpeakOptions) => void;
}
