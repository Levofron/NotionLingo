import { functionImportTest } from '@utils';

import { injectDependencies } from './inject-dependencies.function';

describe('injectDependencies function', () => {
  functionImportTest(injectDependencies);
});
