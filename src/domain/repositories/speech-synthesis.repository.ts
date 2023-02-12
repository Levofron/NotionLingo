export interface ISpeechSynthesisRepository {
  getPitch: () => number;
  getRate: () => number;
  getVoice: () => SpeechSynthesisVoice | undefined;
  getVoices: () => SpeechSynthesisVoice[];
  getVolume: () => number;
  isSupported: () => boolean;
  onVoicesChanged: (callback: () => void) => void;
  setPitch: (pitch: number) => void;
  setRate: (rate: number) => void;
  setVoice: (newVoiceName: string) => void;
  setVolume: (volume: number) => void;
  speak: (text: string) => void;
}
