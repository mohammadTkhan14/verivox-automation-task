Verivox Automation Challenge
Automation test suite for testing 3 scenarios for verivox portal.

Prerequisites
1. Node.js : Node js should be installed.
2. Git : For cloning the repository.
3. Cypress : This is handled through project dependency.

Project Setup and Installation: From the terminal

Step 1: Clone the repo from the terminal
git clone https://github.com/mohammadTkhan14/verivox-automation-task.git

Step 2: Navigate to project folder - using the below command

cd verivox-automation-task  - 

just verify if the project is cloned properly run the ls command and we should see

cypress README.md cypress.config.js [files]

Step 3: Install the dependencies

npm install

Step 4: Running the Tests

Headless Test Execution

npm run test
[reports can be found cypress/reports/yml and cypress/reports/html/]

Interactive mode

npm run test:ui


Additional notes:

Project Structure
cypress/: Contains all Cypress test files, fixtures, and page object files.

cypress/e2e/tests/: Test files for specific features and scenarios.

cypress/e2e/pages/: Page Object files containing functions for interacting with elements.

cypress/reports/xml: Directory for generated JUnit XML reports.

cypress/reports/html/: Directory for generated HTML reports.


