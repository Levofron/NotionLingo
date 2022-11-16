import { functionImportTest } from '@utils';

import { createDevToolsClient } from './create-dev-tools-client.function';

describe('createDevToolsClient function', () => {
  functionImportTest(createDevToolsClient);
});
