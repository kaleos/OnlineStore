const playwright = require("@playwright/test"); // The playwright keyword helps generate a browser object.
const { Before, After, AfterStep, Status } = require("@cucumber/cucumber")
const fs = require('fs');
const path = require('path');
const { validCredentials, invalidCredentials, emptyCredentials } = require('../../fixtures/loginFixtures')

Before(async function () {
  this.browser = await playwright.chromium.launch({ headless: false })
  const context = await this.browser.newContext()
  this.page = await context.newPage()
  // Inject credentials into world context
  this.validCredentials = validCredentials
  this.invalidCredentials = invalidCredentials
  this.emptyCredentials = emptyCredentials
})

AfterStep(async function ({ result }) {
  if (result?.status === Status.FAILED) {
    // Determine the screenshots folder path relative to project root.
    const screenshotDir = path.resolve(__dirname, '../../screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    await this.page.screenshot({ path: path.join(screenshotDir, `screenshot-${Date.now()}.png`) });
  }
})

After(async function () {
  if (this.browser) {
    await this.browser.close();
    console.log("Browser closed");
  }
})
