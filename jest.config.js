const mapPathsFromTsConfig = require('jest-module-name-mapper').default;

module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/pages'],
  testEnvironment: 'jsdom',
  moduleNameMapper: mapPathsFromTsConfig(),
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testMatch: ['**/?(*.)+(spec).+(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/infrastructure/config/jest/setup-tests.ts'],
};
