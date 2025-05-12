const { Given, Then } = require('@cucumber/cucumber')
const { LoginPage } = require('../../pages/LoginPage')
const assert = require('assert')
const { loginURL } = require('../../playwright.config')
const { accountURL } = require('../../playwright.config')
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

Then('The user is logged in successfully', async function() {
    await this.page.waitForURL(accountURL)
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