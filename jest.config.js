module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["*/.{js}", "!*/node_modules/*"],
  coverageDirectory: "../testcoverage-intermanager",
};