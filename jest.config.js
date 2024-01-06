const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.+(spec|test).[jt]s?(x)"],
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@/configs/(.*)$": "<rootDir>/src/configs/$1",
    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
