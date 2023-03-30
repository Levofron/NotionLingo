import { functionImportTest } from '@infrastructure/functions';

import { getSpeechSynthesisValueFromLocalStorage } from './get-speech-synthesis-value-from-local-storage.function';

describe('getSpeechSynthesisValueFromLocalStorage function', () => {
  functionImportTest(getSpeechSynthesisValueFromLocalStorage);
});
