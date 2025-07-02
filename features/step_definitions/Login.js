const { Given, When, Then } = require('@cucumber/cucumber')
const { LoginPage } = require('../../pages/LoginPage')
const { expect } = require('@playwright/test')
const { loginURL } = require('../../playwright.config')
const { accountURL } = require('../../playwright.config')
const { registerURL } = require('../../playwright.config')
const messages = require('../../data/messages.json')

Given('The user is on the login page', async function() {
  await this.page.goto(loginURL)
  this.loginPage = new LoginPage(this.page)
})

// Use credentials from world context if available, otherwise use parameters
When('The user logs in to the store using valid credentials', async function() {
  const { email = username, password: passwd = password } = this.validCredentials || {}
  await this.loginPage.login(email, passwd)
})

Given('The user logs in to the store using invalid credentials', async function() {
  const { email = username, password: passwd = password } = this.invalidCredentials || {}
  await this.loginPage.login(email, passwd)
})

Given('The user attempts to log in to the store without filling the login fields', async function() {
  const { email = username, password: passwd = password } = this.emptyCredentials || {}
  await this.loginPage.login(email, passwd)
})

When('The user clicks on the Continue button', async function() {
  await this.loginPage.clickContinueBtn()
})

Then('The user is logged in successfully', async function() {
  await this.page.waitForURL(accountURL)
})

Then('The register account page is displayed', async function() {
  await this.page.waitForURL(registerURL)
})

Then('An error message is displayed for wrong credentials', async function() {
  const errorMessageElement = await this.loginPage.getErrorMessage()
  expect(await errorMessageElement.textContent()).toBe(messages.login.invalidEmailPassword)
})

Then('Verify an error message is displayed for no matching credentials', async function() {
  const errorMessageElement = await this.loginPage.getErrorMessage()
  expect(await errorMessageElement.textContent()).toBe(messages.login.emptyLoginFields)
})

Then('Verify an error message is displayed for failed login attempts', async function() {
  const errorMessageElement = await this.loginPage.getErrorMessage()
  expect(await errorMessageElement.textContent()).toBe(messages.login.exceededLoginAttempts)
})

Then('All the correct links are displayed on the right side of the login page', async function() {
  const expectedLinks = [
    'Register', 'Forgotten Password', 'My Account', 'Address Book', 'Wish List',
    'Order History', 'Downloads', 'Recurring payments', 'Reward Points', 'Returns',
    'Transactions', 'Newsletter'
  ]
  for (const linkText of expectedLinks) {
    const isVisible = await this.loginPage.isLinksVisible(linkText)
    expect(isVisible).toBe(true)
  }
})

Then('The email address and password labels are displayed on the login page', async function() {
  const areLabelsVisible = await this.loginPage.emailPasswordLabel()
  expect(areLabelsVisible).toBe(true)
})