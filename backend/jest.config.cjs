/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          rootDir: ".",
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          esModuleInterop: true,
          strict: true,
          isolatedModules: true,
          types: ["node", "jest"],
        },
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["<rootDir>/tests/setup-env.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/migrations/**/*.ts",
    "!src/models/**/*.ts",
  ],
};
