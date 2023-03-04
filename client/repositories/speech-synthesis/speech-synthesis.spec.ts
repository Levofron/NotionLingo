import { functionImportTest } from '@infrastructure/utils';

import { getSpeechSynthesisRepository } from './speech-synthesis.repository';

jest.useFakeTimers();

const BASE_SPEECH_SYNTHESIS_SOURCE_MOCK = {
  speak: jest.fn(),
  cancel: jest.fn(),
  onVoicesChanged: jest.fn(),
  getVoices: jest.fn().mockReturnValue([]),
  isSupported: jest.fn().mockReturnValue(true),
};

describe('getSpeechSynthesisRepository function', () => {
  functionImportTest(getSpeechSynthesisRepository);

  it('should return proper object', () => {
    const speechSynthesisRepository = getSpeechSynthesisRepository(
      BASE_SPEECH_SYNTHESIS_SOURCE_MOCK,
      {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn(),
      },
    );

    expect(speechSynthesisRepository).toEqual({
      speak: expect.any(Function),
      getRate: expect.any(Function),
      setRate: expect.any(Function),
      getPitch: expect.any(Function),
      setPitch: expect.any(Function),
      getVoice: expect.any(Function),
      setVoice: expect.any(Function),
      getVolume: expect.any(Function),
      setVolume: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
      onVoicesChanged: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    const speechSynthesisRepository = getSpeechSynthesisRepository(
      BASE_SPEECH_SYNTHESIS_SOURCE_MOCK,
      {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      },
    );

    expect(speechSynthesisRepository.isSupported()).toBeTruthy();
  });

  it('should call speak function', () => {
    const localStorageApi = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn(),
    };

    const speechSynthesisRepository = getSpeechSynthesisRepository(
      BASE_SPEECH_SYNTHESIS_SOURCE_MOCK,
      localStorageApi,
    );

    speechSynthesisRepository.speak('test');

    jest.advanceTimersByTime(1);

    expect(BASE_SPEECH_SYNTHESIS_SOURCE_MOCK.speak).toHaveBeenCalledWith({
      pitch: 1,
      rate: 0.8,
      volume: 1,
      text: 'test',
      voice: undefined,
    });
  });

  it('should call getVoices function', () => {
    const localStorageApi = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn(),
    };

    const speechSynthesisRepository = getSpeechSynthesisRepository(
      BASE_SPEECH_SYNTHESIS_SOURCE_MOCK,
      localStorageApi,
    );

    speechSynthesisRepository.getVoices();

    expect(BASE_SPEECH_SYNTHESIS_SOURCE_MOCK.getVoices).toHaveBeenCalled();
  });
});
