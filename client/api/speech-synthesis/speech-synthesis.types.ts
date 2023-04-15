import { SpeakOptions } from '@domain/speech-synthesis/speech-synthesis.models';

export interface SpeechSynthesisApi {
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isSupported: () => boolean;
  onVoicesChanged: (callback: () => void) => void;
  speak: (options: SpeakOptions) => void;
}
