import { functionImportTest } from '@shared/functions';

import { getSpeechSynthesisApi } from './speech-synthesis.api';

jest.useFakeTimers();

describe('getSpeechSynthesisApi function', () => {
  functionImportTest(getSpeechSynthesisApi);

  it('should return proper object', () => {
    const speechSynthesisApi = getSpeechSynthesisApi();

    expect(speechSynthesisApi).toEqual({
      speak: expect.any(Function),
      cancel: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
      onVoicesChanged: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    const speechSynthesisApi = getSpeechSynthesisApi();

    expect(speechSynthesisApi.isSupported()).toBeFalsy();

    // @ts-expect-error
    window.speechSynthesis = {};

    expect(speechSynthesisApi.isSupported()).toBeTruthy();
  });

  it('should call speak function', () => {
    const speechSynthesisApi = getSpeechSynthesisApi();

    window.speechSynthesis.speak = jest.fn();

    window.SpeechSynthesisUtterance = jest.fn();

    speechSynthesisApi.speak({
      text: 'test',
    });

    expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'test',
      }),
    );
  });

  it('should call cancel function', () => {
    const speechSynthesisApi = getSpeechSynthesisApi();

    window.speechSynthesis.cancel = jest.fn();

    speechSynthesisApi.cancel();

    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('should call getVoices function', () => {
    const speechSynthesisApi = getSpeechSynthesisApi();

    window.speechSynthesis.getVoices = jest.fn().mockReturnValue([]);

    speechSynthesisApi.getVoices();

    expect(window.speechSynthesis.getVoices).toHaveBeenCalled();
  });
});
