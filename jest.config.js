const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/layout.tsx',
    '!app/**/*.d.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.test.{ts,tsx}'],
}

module.exports = createJestConfig(config)
