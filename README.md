# Verivox Automation Challenge

## Overview
This is an automation test suite designed for testing three scenarios on the Verivox portal using Cypress.

## Prerequisites
- **Node.js**: Ensure Node.js is installed on your system [node version v22.11.0].
  How to install ? https://nodejs.org/en/learn/getting-started/how-to-install-nodejs 
- **Git**: Required for cloning the repository.
- **Cypress**: Handled through project dependencies.

## Project Setup and Installation
Follow these steps to set up the project:

### Step 1: Clone the Repository
Clone the repository from GitHub using the following command:

```bash
git clone https://github.com/mohammadTkhan14/verivox-automation-task.git
```
### Step 2: Navigate to the Project Folder
Change to the project directory using the following command:

```bash
cd verivox-automation-task
```
### Step 3: Install the Dependencies
Install the required dependencies by running the following command:

```bash
npm install
```

### Step 4: Running the Tests
#### Headless Test Execution
To run the tests in headless mode, use the following command:

```bash
npm run test
```
reports can be found cypress/reports/yml and cypress/reports/html/

#### Interactive mode
To run the tests in interactive mode (with the UI), use the following command:
```bash
npm run test:ui
```

## Additional Notes

### Project Structure

- **cypress/**: Contains all Cypress test files, fixtures, and page object files.

- **cypress/e2e/tests/**: Test files for specific features and scenarios.

- **cypress/e2e/pages/**: Page Object files containing functions for interacting with elements.

- **cypress/reports/xml/**: Directory for generated JUnit XML reports.

- **cypress/reports/html/**: Directory for generated HTML reports.