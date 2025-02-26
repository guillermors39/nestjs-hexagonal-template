# Hexagonal Architecture Template
For the purpose of example, the structure of a use case is included which can be completely eliminated.

## The architecture

The architecture was explained on [this document](https://muchosol.atlassian.net/wiki/x/A4BlDw)

## Code conventions
The code conventions was explained on [this document](https://muchosol.atlassian.net/wiki/x/BoBzDw)

## Commands

### Tests
- `npm run test`: Run unit tests
- `npm run test:cov`: Run unit tests and report the testing coverage
- `npm run test:e2e`: Run end-to-end tests
- `npm run test:e2e:cov`: Run end-to-end tests and report the testing coverage (requests validation, responses, controllers)

### Dependency cruiser check
- `npm run arch:check`: Verify that all project files correctly comply with the architecture dependencies
