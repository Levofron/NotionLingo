import { ISpeakOptions } from '@domain/entities/speech-synthesis.types';

export interface ISpeechSynthesisApi {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  onVoicesChanged: (callback: () => void) => void;
  speak: (options: ISpeakOptions) => void;
}
