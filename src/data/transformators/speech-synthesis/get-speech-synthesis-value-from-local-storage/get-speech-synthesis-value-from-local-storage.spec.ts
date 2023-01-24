import { functionImportTest } from '@infrastructure/utils';

import { getSpeechSynthesisValueFromLocalStorage } from './get-speech-synthesis-value-from-local-storage.function';

describe('getSpeechSynthesisValueFromLocalStorage function', () => {
  functionImportTest(getSpeechSynthesisValueFromLocalStorage);
});
