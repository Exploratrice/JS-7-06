const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    retries: 1,
    viewportHeight1: 1080,
    viewportWidth1: 1920,
    viewportHeight2: 360,
    viewportWidth2: 740,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});