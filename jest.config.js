const mapPathsFromTsConfig = require('jest-module-name-mapper').default;

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: mapPathsFromTsConfig(),
  testMatch: ['**/?(*.)+(spec).+(ts|tsx)'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  roots: ['<rootDir>/client', '<rootDir>/pages'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup-tests.ts'],
};
