const path = require('node:path');
const inquirerDirectory = require('inquirer-directory');

module.exports = (plop) => {
  plop.addPrompt('directory', inquirerDirectory);
  plop.addHelper('absPath', (_absPath) =>
    path.resolve(plop.getPlopfilePath(), '../../..', _absPath),
  );

  plop.setGenerator('function', {
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Please enter a function name (lowercase, with spaces):',
      },
      {
        name: 'path',
        basePath: '.',
        type: 'directory',
        message: 'Where would you like to put this function?',
      },
    ],
    actions: [
      {
        verbose: true,
        type: 'addMany',
        base: 'templates',
        stripExtensions: ['hbs'],
        templateFiles: 'templates/*.hbs',
        destination: '{{absPath path}}/{{kebabCase name}}',
      },
    ],
  });
};
