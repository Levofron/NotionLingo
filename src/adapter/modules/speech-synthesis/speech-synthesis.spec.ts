import { speechSynthesisModule } from './speech-synthesis.module';

describe('speechSynthesisModule object', () => {
  it('should return proper object', () => {
    expect(speechSynthesisModule).toEqual({
      speak: expect.any(Function),
      cancel: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });
});
