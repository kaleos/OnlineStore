const base = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { loginURL } = require('../playwright.config')

// Export credentials for use in hooks or steps
const validCredentials = {
  email: "gtest@email.com",
  password: "Weberfgrt184",
}
const invalidCredentials = {
  email: "invalid@email.com",
  password: "wrongpassword",
}
const emptyCredentials = {
  email: "",
  password: "",
}

exports.loginFixtures = base.test.extend({
  loginPage: async ({ page }, use) => {
    await page.goto(loginURL)
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  validCredentials,
  invalidCredentials,
  emptyCredentials,
})

// Export for Cucumber hooks
exports.validCredentials = validCredentials
exports.invalidCredentials = invalidCredentials
exports.emptyCredentials = emptyCredentials
