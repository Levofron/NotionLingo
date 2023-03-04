const path = require('node:path');
const inquirerDirectory = require('inquirer-directory');

module.exports = (plop) => {
  plop.addPrompt('directory', inquirerDirectory);
  plop.addHelper('absPath', (_absPath) =>
    path.resolve(plop.getPlopfilePath(), '../../../client', _absPath),
  );
  plop.addPartial(
    'componentNameInBracesPartial',
    (name, str) => `{${str.helpers.properCase(name.name, 0)}}`,
  );

  plop.setGenerator('component', {
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Please enter a component name (lowercase, with spaces):',
      },
      {
        type: 'list',
        name: 'type',
        choices: ['component', 'layout', 'template', 'page'],
        message: 'What type of component do you want to generate?',
      },
      {
        name: 'path',
        type: 'directory',
        basePath: './client',
        message: 'Where would you like to put this component?',
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
