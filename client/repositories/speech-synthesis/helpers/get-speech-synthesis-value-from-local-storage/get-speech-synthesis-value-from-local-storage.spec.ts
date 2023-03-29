import { functionImportTest } from '@infrastructure/jest';

import { getSpeechSynthesisValueFromLocalStorage } from './get-speech-synthesis-value-from-local-storage.function';

describe('getSpeechSynthesisValueFromLocalStorage function', () => {
  functionImportTest(getSpeechSynthesisValueFromLocalStorage);
});
