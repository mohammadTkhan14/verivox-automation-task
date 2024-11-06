module.exports = {
  e2e: {
    // Configure retries for test execution
    retries: {
      runMode: 2,  // Retry tests 2 times when running in headless mode (cypress run)
      openMode: 0, // Retry tests 0 times when running interactively (cypress open)
    },

    // Set up Node event listeners for plugins
    setupNodeEvents(on, config) {
      // Include the Mochawesome reporter plugin for generating reports
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    // Specify the pattern to include only tests in the `cypress/e2e/tests` folder
    specPattern: "cypress/e2e/tests/**/*.js",

    // Configure reporters for combining multiple report types
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      // Enable multiple reporters: JUnit and Mochawesome
      reporterEnabled: 'mocha-junit-reporter, cypress-mochawesome-reporter',

      // Configure options for Mocha JUnit reporter
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/xml/junit-results-[hash].xml',  // Output location for JUnit XML reports
        toConsole: true,  // Display results in the console as well
      },

      // Configure options for Mochawesome reporter
      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'cypress/reports/html', // Folder for HTML reports
        overwrite: true,  // Overwrite previous reports
        html: true,       // Generate HTML report
        json: true,       // Generate JSON report
      },
    },
  },
};
