import { functionImportTest } from '@infrastructure/utils';

import { getSpeechSynthesisApi } from './speech-synthesis.api';

jest.useFakeTimers();

describe('getSpeechSynthesisApi function', () => {
  functionImportTest(getSpeechSynthesisApi);

  it('should return proper object', () => {
    const speechSynthesisSource = getSpeechSynthesisApi();

    expect(speechSynthesisSource).toEqual({
      speak: expect.any(Function),
      cancel: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
      onVoicesChanged: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    const speechSynthesisSource = getSpeechSynthesisApi();

    expect(speechSynthesisSource.isSupported()).toBeFalsy();

    // @ts-expect-error
    window.speechSynthesis = {};

    expect(speechSynthesisSource.isSupported()).toBeTruthy();
  });

  it('should call speak function', () => {
    const speechSynthesisSource = getSpeechSynthesisApi();

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
    const speechSynthesisSource = getSpeechSynthesisApi();

    window.speechSynthesis.cancel = jest.fn();

    speechSynthesisSource.cancel();

    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('should call getVoices function', () => {
    const speechSynthesisSource = getSpeechSynthesisApi();

    window.speechSynthesis.getVoices = jest.fn().mockReturnValue([]);

    speechSynthesisSource.getVoices();

    expect(window.speechSynthesis.getVoices).toHaveBeenCalled();
  });
});
