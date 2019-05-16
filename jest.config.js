// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,

  coverageDirectory: "coverage",

  testEnvironment: "node",

  bail: true,

  coveragePathIgnorePatterns: ["/node_modules/", "src/config"],

  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],

  verbose: true
};
