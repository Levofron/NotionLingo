import { speechSynthesisModule } from './speech-synthesis.module';

describe('speechSynthesisModule object', () => {
  it('should return proper object', () => {
    expect(speechSynthesisModule).toEqual({
      speak: expect.any(Function),
      setRate: expect.any(Function),
      getRate: expect.any(Function),
      getPitch: expect.any(Function),
      getVoice: expect.any(Function),
      setPitch: expect.any(Function),
      setVoice: expect.any(Function),
      getVoices: expect.any(Function),
      getVolume: expect.any(Function),
      setVolume: expect.any(Function),
      isSupported: expect.any(Function),
      onVoicesChanged: expect.any(Function),
    });
  });
});
