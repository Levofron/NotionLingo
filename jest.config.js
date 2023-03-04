const mapPathsFromTsConfig = require('jest-module-name-mapper').default;

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: mapPathsFromTsConfig(),
  testMatch: ['**/?(*.)+(spec).+(ts|tsx)'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup-tests.ts'],
  roots: ['<rootDir>/client', '<rootDir>/server', '<rootDir>/pages'],
};
