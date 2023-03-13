import { exec } from 'node:child_process';

export const executeCommand = (command: string) =>
  new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error?.message || error);
      }

      resolve(stdout);
    });
  });
