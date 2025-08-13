import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: process.env.NETLIFY == 'true' ? process.env.DEPLOY_PRIME_URL : "http://localhost:4321",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  retries: {
    runMode: 2,
    openMode: 0
  }
});
