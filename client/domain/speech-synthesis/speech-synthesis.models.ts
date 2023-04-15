export interface SpeakOptions {
  pitch?: number;
  rate?: number;
  text: string;
  voice?: SpeechSynthesisVoice | null;
  volume?: number;
}
