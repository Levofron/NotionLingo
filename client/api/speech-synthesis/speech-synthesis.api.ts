import { SpeechSynthesisApi } from './speech-synthesis.types';

export const getSpeechSynthesisApi = (): SpeechSynthesisApi => ({
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
  getVoices: () => {
    const allVoices = window.speechSynthesis.getVoices() || [];

    return allVoices.filter((_voice) => _voice.lang.includes('en'));
  },
  onVoicesChanged: (callback) => {
    window.speechSynthesis.onvoiceschanged = () => setTimeout(callback, 0);
  },
});
