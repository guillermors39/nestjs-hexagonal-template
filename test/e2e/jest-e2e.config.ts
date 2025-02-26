import { Config } from 'jest';
import { compilerOptions } from '../../tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testEnvironment: 'node',
  testRegex: 'test/e2e/.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/controllers/**/*.ts',
    'src/**/responses/**/*.ts',
    'src/**/requests/**/*.ts',
    'src/**/repositories/**/*.ts',
  ],
  coverageDirectory: '<rootDir>/test/e2e/coverage',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
};

export default config;
