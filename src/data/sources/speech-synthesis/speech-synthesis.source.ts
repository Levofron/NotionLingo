import { ISpeechSynthesisSource } from './speech-synthesis.types';

export const getSpeechSynthesisSource = (): ISpeechSynthesisSource => ({
  isSupported: () => typeof window !== 'undefined' && !!window.speechSynthesis,
  speak: ({ pitch = 1, rate = 0.8, text, voice = null, volume = 1 }) => {
    const utterance = new window.SpeechSynthesisUtterance();

    utterance.text = text;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = voice;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  },
  cancel: () => window.speechSynthesis.cancel(),
  getVoices: () => window.speechSynthesis.getVoices(),
});
