import { functionImportTest } from '@infrastructure/utils';

import { getSpeechSynthesisSource } from './speech-synthesis.source';

describe('getSpeechSynthesisSource function', () => {
  functionImportTest(getSpeechSynthesisSource);

  it('should return proper object', () => {
    const speechSynthesisSource = getSpeechSynthesisSource();

    expect(speechSynthesisSource).toEqual({
      speak: expect.any(Function),
      cancel: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    const speechSynthesisSource = getSpeechSynthesisSource();

    expect(speechSynthesisSource.isSupported()).toBeFalsy();

    // @ts-expect-error
    window.speechSynthesis = {};

    expect(speechSynthesisSource.isSupported()).toBeTruthy();
  });

  it('should call speak function', () => {
    const speechSynthesisSource = getSpeechSynthesisSource();

    window.speechSynthesis.speak = jest.fn();

    window.SpeechSynthesisUtterance = jest.fn();

    speechSynthesisSource.speak({
      text: 'test',
    });

    expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'test',
      }),
    );
  });

  it('should call cancel function', () => {
    const speechSynthesisSource = getSpeechSynthesisSource();

    window.speechSynthesis.cancel = jest.fn();

    speechSynthesisSource.cancel();

    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('should call getVoices function', () => {
    const speechSynthesisSource = getSpeechSynthesisSource();

    window.speechSynthesis.getVoices = jest.fn();

    speechSynthesisSource.getVoices();

    expect(window.speechSynthesis.getVoices).toHaveBeenCalled();
  });
});
