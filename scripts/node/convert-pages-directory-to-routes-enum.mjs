import fs from 'node:fs';
import path from 'node:path';

const getPath = (destination) => {
  const currentDirectory = process.cwd();

  return path.join(currentDirectory, destination);
};

const getPagesDirectoryPath = () => getPath('pages');

const getRouteTypesDirectoryPath = () => getPath('client/infrastructure/types/routes.ts');

const getFilenamesFromDirectory = (dirname) =>
  new Promise((resolve, reject) => {
    fs.readdir(dirname, (error, filenames) => {
      if (error) {
        reject(error);

        return;
      }

      const filteredFilenames = filenames.filter((filename) =>
        fs.lstatSync(`${dirname}/${filename}`).isFile(),
      );

      resolve(filteredFilenames);
    });
  });

const filterOutFilesWithFloorAtBeginning = (filenames) =>
  filenames.filter((filename) => !filename.startsWith('_'));

const removeExtensionsFromFilenames = (filenames) =>
  filenames.map((filename) => filename.replace(/\.[^./]+$/, ''));

const replace = (string, search, replaceWith) => string.split(search).join(replaceWith);

const convertNamesToEnumBody = (names) =>
  names
    .map((name) => {
      const variableName = replace(name, '-', '_');

      if (variableName === 'index') {
        return "  HOME = '/'";
      }

      if (variableName === '404') {
        return `  NOT_FOUND = '/${variableName}'`;
      }

      return `  ${variableName.toUpperCase()} = '/${name}'`;
    })
    .sort()
    .join(',\n');

const writeEnumToRoutesFile = (enumContent) => {
  const directoryPath = getRouteTypesDirectoryPath();

  fs.writeFileSync(directoryPath, enumContent);
};

const main = async () => {
  const pagesDirectoryPath = getPagesDirectoryPath();

  const filenames = await getFilenamesFromDirectory(pagesDirectoryPath);
  const filteredFilenames = filterOutFilesWithFloorAtBeginning(filenames);
  const filenamesWithoutExtensions = removeExtensionsFromFilenames(filteredFilenames);

  const enumBody = convertNamesToEnumBody(filenamesWithoutExtensions);
  const enumContent = `export enum ERoutes {\n${enumBody}\n}\n`;

  writeEnumToRoutesFile(enumContent);
};

main();
