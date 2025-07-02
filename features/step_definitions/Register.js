const { Given, When, Then, } = require('@cucumber/cucumber')
const { RegisterPage } = require('../../pages/RegisterPage')
const { expect } = require('@playwright/test')
const { registerURL } = require('../../playwright.config')
const { generateRandomUserData } = require('../../utils/randomDataGenerator')
const { generateRandomUserDataWithDifferentPasswords } = require('../../utils/randomDataGenerator')
const messages = require('../../data/messages.json')

Given('The user is on the register page', async function() {
  await this.page.goto(registerURL)
  this.registerPage = new RegisterPage(this.page)
})

When('Clicking on the Continue button', async function() {
  await this.registerPage.clickContinueBtn()
})

When('The user enters valid data in all required fields', async function() {
  const userData = generateRandomUserData()
  await this.registerPage.register(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.phone,
    userData.password,
    userData.passwordConfirm
  ) 
})

When('The user enters invalid data in all required fields', async function() {
  const userData = generateRandomUserDataWithDifferentPasswords()
  await this.registerPage.register(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.phone,
    userData.password,
    userData.passwordConfirm
  ) 
})

When('The user clicks on the Yes radio button', async function() {
  await this.registerPage.clickSubscribe('Yes')
})

When('The user clicks on the No radio button', async function() {
  await this.registerPage.clickSubscribe('No')
})

Then('A success message should be displayed', async function() {
  const successMessage = await this.registerPage.getRegistrationSuccessMessage()
  expect(successMessage).toBe(messages.register.registrationSuccessful)
})  

Then('An error message is displayed for mismatched passwords', async function() {
  const mismatchPassword = await this.registerPage.getPasswordMismatchMessage()
  expect(mismatchPassword).toBe(messages.register.passwordMismatch)
}) 

Then('Error messages are displayed for all required fields', async function() {
  const errorMessages = await this.registerPage.getAllErrorMessages()
  const expectedMessages = [
    messages.register.firstName,
    messages.register.lastName,
    messages.register.email,
    messages.register.telephone,
    messages.register.password,
    messages.register.privacyPolicy
  ]
  for (const [index, errorMessage] of errorMessages.entries()) {
    expect(errorMessage).toBe(expectedMessages[index])
  }
})

Then('The following {string} should be displayed', async function(label) {
  const labels = label.split(',').map(l => l.trim())
  expect(await this.registerPage.leftLabelsVisible(labels)).toBe(true)
})

Then('The correct {string} should be displayed', async function(link) {
  expect(await this.registerPage.rightLinksVisible(link)).toBe(true)
})

Then('The radio button is checked for Yes Subscribe', async function() {
  expect(await this.registerPage.radioBtnChecked('Yes')).toBe(true)
})

Then('The radio button is checked for No Subscribe', async function() {
  expect(await this.registerPage.radioBtnChecked('No')).toBe(true)
})

Then('The text I have read and agree to the Privacy Policy is displayed', async function() {
  const isPrivacyPolicyPresent = await this.registerPage.privacyPolicy()
  expect(isPrivacyPolicyPresent).toBe(true)
  if (!isPrivacyPolicyPresent) {
    console.log('Privacy policy text was not found on the page')
  }
})