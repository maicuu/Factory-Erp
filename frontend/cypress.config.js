import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    
    
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },

    
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: false, 

    },
  },
);