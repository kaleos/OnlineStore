# Online Store

# E2E tests for Playwright with JavaScript and Cucumber

### Overview

This repository features E2E tests for a web application, all implemented using Playwright with JavaScript and Cucumber.

Comprehensive Tests are triggered automatically in GitHub Actions CI/CD whenever a PUSH to main occurs.

## Tesing Resource(URL) Used
- Tests: https://practicesoftwaretesting.com/


### How to run the tests: 

By Test name:

npx playwright test <testname>.spec.js


Runs test without providing the actual path, all tests will run in parallel by default just like in Github Actions:

npx playwright test


Run all tests in Headed mode:

npx playwright test --headed


### Debug mode:

npx playwright test <testname>.spec.js --debug


### Launch the Playwright Test Runner in UI mode:

npx playwright test --ui

### Running Cucumber Test Cases:

To execute Cucumber test cases, use:

npx cucumber-js

Note: Cucumber does not provide an interactive UI mode like Playwright's --ui flag.


### Run tests with specific tags
npx playwright test --grep "@tagname"


### CI/CD Pipeline Execution:
- UI tests are triggered automatically in GitHub Actions CI/CD whenever a PUSH to main occurs.

To trigger a manual pipeline run:

- Click Actions tab from the project
- Select Worflow
- Click Run workflow
- Select Branch to run in
- Select Run workflow
