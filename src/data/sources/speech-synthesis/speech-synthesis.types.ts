import { ISpeakOptions } from '@domain/speech-synthesis/speech-synthesis.types';

export interface ISpeechSynthesisSource {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  onVoicesChanged: (callback: () => void) => void;
  speak: (options: ISpeakOptions) => void;
}
