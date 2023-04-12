import { ISpeakOptions } from '@domain/speech-synthesis/speech-synthesis.models';

export interface ISpeechSynthesisApi {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  onVoicesChanged: (callback: () => void) => void;
  speak: (options: ISpeakOptions) => void;
}
