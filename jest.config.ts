import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: 'test/unit/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/shared/infrastructure/configs/**/*.ts',
    '!src/**/*.provider.ts',
    '!src/**/contracts/**/*.ts',
    '!src/**/controllers/**/*.ts',
    '!src/**/interceptors/**/*.ts',
    '!src/**/responses/**/*.ts',
    '!src/**/requests/**/*.ts',
    '!src/**/schemas/**/*.ts',
    '!src/**/repositories/**/*.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.enum.ts',
    '!src/shared/infrastructure/services/**/*.ts',
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  testEnvironment: 'node',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
