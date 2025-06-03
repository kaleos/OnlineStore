const { Given, When, Then } = require('@cucumber/cucumber')
const { LoginPage } = require('../../pages/LoginPage')
const assert = require('assert')
const { loginURL } = require('../../playwright.config')
const { accountURL } = require('../../playwright.config')
const { registerURL } = require('../../playwright.config')
const messages = require('../../data/messages.json') // added to import expected messages

// Use credentials from world context if available, otherwise use parameters
Given('The user logs in to the store using valid credentials', async function() {
  await this.page.goto(loginURL)
  const loginPage = new LoginPage(this.page)
  const { email = username, password: passwd = password } = this.validCredentials || {}
  await loginPage.login(email, passwd)
})

Given('The user logs in to the store using invalid credentials', async function() {
  await this.page.goto(loginURL)
  const loginPage = new LoginPage(this.page)
  const { email = username, password: passwd = password } = this.invalidCredentials || {}
  await loginPage.login(email, passwd)
})

Given('The user attempts to log in to the store without filling the login fields', async function() {
  await this.page.goto(loginURL)
  const loginPage = new LoginPage(this.page)
  const { email = username, password: passwd = password } = this.emptyCredentials || {}
  await loginPage.login(email, passwd)
})

Given('The user is on the login page', async function() {
  await this.page.goto(loginURL)
})

When('The user clicks on the Continue button', async function() {
  const loginPage = new LoginPage(this.page)
  await loginPage.clickContinueBtn()
})

Then('The user is logged in successfully', async function() {
  await this.page.waitForURL(accountURL)
})

Then('The register account page is displayed', async function() {
  await this.page.waitForURL(registerURL)
})

Then('An error message is displayed for wrong credentials', async function() {
  const loginPage = new LoginPage(this.page)
  const errorMessageElement = await loginPage.getErrorMessage()
  const actualMessage = await errorMessageElement.innerText()
  assert.strictEqual(actualMessage.trim(), messages.login.invalidEmailPassword.trim())
})

Then('Verify an error message is displayed for no matching credentials', async function() {
  const loginPage = new LoginPage(this.page)
  const errorMessageElement = await loginPage.getErrorMessage()
  const actualMessage = await errorMessageElement.innerText()
  assert.strictEqual(actualMessage.trim(), messages.login.emptyLoginFields.trim())
})

Then('Verify an error message is displayed for failed login attempts', async function() {
  const loginPage = new LoginPage(this.page)
  const errorMessageElement = await loginPage.getErrorMessage()
  const actualMessage = await errorMessageElement.innerText()
  assert.strictEqual(actualMessage.trim(), messages.login.exceededLoginAttempts.trim())
})

Then('All the correct links are displayed on the right side of the login page', async function() {
  const loginPage = new LoginPage(this.page)
  const expectedLinks = [
    'Register', 'Forgotten Password', 'My Account', 'Address Book', 'Wish List',
    'Order History', 'Downloads', 'Recurring payments', 'Reward Points', 'Returns',
    'Transactions', 'Newsletter'
  ]
  for (const linkText of expectedLinks) {
    const isVisible = await loginPage.isLinksVisible(linkText)
    assert.strictEqual(isVisible, true, `Link "${linkText}" is not visible`)
  }
})

Then('The email address and password labels are displayed on the login page', async function() {
  const loginPage = new LoginPage(this.page)
  const areLabelsVisible = await loginPage.emailPasswordLabel()
  assert.strictEqual(areLabelsVisible, true, 'Email address or password label is not visible')
})