import { functionImportTest } from '@infrastructure/utils';

import { getSpeechSynthesisRepository } from './speech-synthesis.repository';

describe('getSpeechSynthesisRepository function', () => {
  functionImportTest(getSpeechSynthesisRepository);

  it('should return proper object', () => {
    const speechSynthesisRepository = getSpeechSynthesisRepository(
      {
        speak: jest.fn(),
        cancel: jest.fn(),
        getVoices: jest.fn(),
        isSupported: jest.fn(),
      },
      {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn(),
      },
    );

    expect(speechSynthesisRepository).toEqual({
      speak: expect.any(Function),
      cancel: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    const speechSynthesisRepository = getSpeechSynthesisRepository(
      {
        speak: jest.fn(),
        cancel: jest.fn(),
        getVoices: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      },
      {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn(),
      },
    );

    expect(speechSynthesisRepository.isSupported()).toBeTruthy();
  });

  it('should call speak function', () => {
    const speechSynthesisSource = {
      speak: jest.fn(),
      cancel: jest.fn(),
      getVoices: jest.fn(),
      isSupported: jest.fn().mockReturnValue(true),
    };

    const localStorageSource = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn(),
    };

    const speechSynthesisRepository = getSpeechSynthesisRepository(
      speechSynthesisSource,
      localStorageSource,
    );

    speechSynthesisRepository.speak('test');

    expect(speechSynthesisSource.speak).toHaveBeenCalledWith('test');
  });

  it('should call cancel function', () => {
    const speechSynthesisSource = {
      speak: jest.fn(),
      cancel: jest.fn(),
      getVoices: jest.fn(),
      isSupported: jest.fn().mockReturnValue(true),
    };

    const localStorageSource = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn(),
    };

    const speechSynthesisRepository = getSpeechSynthesisRepository(
      speechSynthesisSource,
      localStorageSource,
    );

    speechSynthesisRepository.cancel();

    expect(speechSynthesisSource.cancel).toHaveBeenCalled();
  });

  it('should call getVoices function', () => {
    const speechSynthesisSource = {
      speak: jest.fn(),
      cancel: jest.fn(),
      getVoices: jest.fn(),
      isSupported: jest.fn().mockReturnValue(true),
    };

    const localStorageSource = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn(),
    };

    const speechSynthesisRepository = getSpeechSynthesisRepository(
      speechSynthesisSource,
      localStorageSource,
    );

    speechSynthesisRepository.getVoices();

    expect(speechSynthesisSource.getVoices).toHaveBeenCalled();
  });
});
