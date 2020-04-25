module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["jest-extended", "<rootDir>/src/setuptests.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
