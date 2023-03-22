import { ISpeakOptions } from '@domain/speech-synthesis/speech-synthesis.entities';

export interface ISpeechSynthesisApi {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  onVoicesChanged: (callback: () => void) => void;
  speak: (options: ISpeakOptions) => void;
}
