const mapPathsFromTsConfig = require('jest-module-name-mapper').default;

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: mapPathsFromTsConfig(),
  testMatch: ['**/?(*.)+(spec).+(ts|tsx)'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  roots: ['<rootDir>/src', '<rootDir>/pages'],
  setupFilesAfterEnv: ['<rootDir>/src/infrastructure/config/jest/setup-tests.ts'],
};
