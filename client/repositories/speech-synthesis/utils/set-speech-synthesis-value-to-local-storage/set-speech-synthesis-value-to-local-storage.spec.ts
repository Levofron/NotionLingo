import { functionImportTest } from '@infrastructure/utils';

import { setSpeechSynthesisValueToLocalStorage } from './set-speech-synthesis-value-to-local-storage.function';

describe('setSpeechSynthesisValueToLocalStorage function', () => {
  functionImportTest(setSpeechSynthesisValueToLocalStorage);
});
