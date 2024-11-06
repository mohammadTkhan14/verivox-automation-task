Verivox Automation Challenge
Automation test suite for testing 3 scenarios for verivox portal.

Prerequisites
1. Node.js : Node js should be installed.
2. Git : For cloning the repository.
3. Cypress : This is handled through project dependency.

Project Setup and Installation: From the terminal

Step 1: Clone the repo
git clone https://github.com/mohammadTkhan14/verivox-automation-task.git

Step 2: Navigate to project folder

cd verivox-automation-task

Step 3: Install the dependencies

npm install

Step 4: Running the Tests

Headless Test Execution

npm run test
[reports can be found cypress/results/ and cypress/reports/html/]

Interactive mode

npm run test:ui


Additional notes:

Project Structure
cypress/: Contains all Cypress test files, fixtures, and page object files.

cypress/e2e/tests/: Test files for specific features and scenarios.

cypress/e2e/pages/: Page Object files containing functions for interacting with elements.

cypress/results/: Directory for generated JUnit XML reports.

cypress/reports/html/: Directory for generated HTML reports.


