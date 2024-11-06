module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: "cypress/e2e/tests/**/*.js",

    // Use cypress-multi-reporters to combine reports
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      // Configure both JUnit and Mochawesome reporters
      reporterEnabled: 'mocha-junit-reporter, cypress-mochawesome-reporter',

      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/xml/junit-results-[hash].xml',
        toConsole: true,
      },

      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'cypress/reports/html', // Folder for HTML reports
        overwrite: true,
        html: true,
        json: true,
      },
    },
  },
};
