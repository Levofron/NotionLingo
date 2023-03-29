import { functionImportTest } from '@infrastructure/jest';

import { setSpeechSynthesisValueToLocalStorage } from './set-speech-synthesis-value-to-local-storage.function';

describe('setSpeechSynthesisValueToLocalStorage function', () => {
  functionImportTest(setSpeechSynthesisValueToLocalStorage);
});
