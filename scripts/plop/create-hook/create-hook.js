const path = require('node:path');
const inquirerDirectory = require('inquirer-directory');

module.exports = (plop) => {
  plop.addPrompt('directory', inquirerDirectory);
  plop.addHelper('absPath', (_absPath) =>
    path.resolve(plop.getPlopfilePath(), '../../../client', _absPath),
  );

  plop.setGenerator('hook', {
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Please enter a hook name (lowercase, with spaces):',
      },
      {
        type: 'list',
        name: 'extension',
        choices: ['ts', 'tsx'],
        message: 'What extension will your hook have?',
      },
      {
        name: 'path',
        type: 'directory',
        basePath: './client',
        message: 'Where would you like to put this hook?',
      },
    ],
    actions: [
      {
        verbose: true,
        type: 'addMany',
        stripExtensions: ['hbs'],
        base: 'templates',
        templateFiles: 'templates/*.hbs',
        destination: '{{absPath path}}/{{kebabCase name}}',
      },
    ],
  });
};
