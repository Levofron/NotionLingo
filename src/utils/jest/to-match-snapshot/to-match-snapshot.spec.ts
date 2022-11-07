import { functionImportTest, toMatchSnapshot } from '..';

describe('toMatchSnapshot function', () => {
  functionImportTest(toMatchSnapshot);

  toMatchSnapshot(() => 'test');
});
