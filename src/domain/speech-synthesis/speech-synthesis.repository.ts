import { ISpeakOptions } from './speech-synthesis.types';

export interface ISpeechSynthesisRepository {
  cancel: () => void;
  getPitch: () => number;
  getRate: () => number;
  getVoice: () => SpeechSynthesisVoice | undefined;
  getVoices: () => SpeechSynthesisVoice[];
  getVolume: () => number;
  isSupported: () => boolean;
  setPitch: (pitch: number) => void;
  setRate: (rate: number) => void;
  setVoice: (newVoiceName: string) => void;
  setVolume: (volume: number) => void;
  speak: (options: ISpeakOptions) => void;
}
