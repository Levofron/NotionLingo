import { functionImportTest } from '@infrastructure/utils';

import { executeCommand } from './execute-command.function';

describe('executeCommand function', () => {
  functionImportTest(executeCommand);

  it('should return stdout', async () => {
    const command = 'echo test';
    const result = await executeCommand(command);

    expect(result).toContain('test');
  });

  it('should throw error', async () => {
    const command = 'echo test && exit 1';

    try {
      await executeCommand(command);
    } catch (error) {
      expect(error).toContain('Command failed: echo test && exit 1');
    }
  });
});
