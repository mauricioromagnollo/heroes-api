export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  testEnvironment: 'node',
  moduleNameMapper: {
    "@/test/(.*)": "<rootDir>/test/$1",
    '@/(.*)': '<rootDir>/src/$1'
  }
};
