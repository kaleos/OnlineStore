class RegisterPage {
  constructor(page) {
    this.page = page
    this.continueBtn = '//input[@value="Continue"]'

    //#region Message locators
    this.messageSuccess = '//div[@id="content"]/h1'
    this.messagePasswordMismatch = '//div[contains(text(),"Password confirmation does not match password!")]'
    //#endregion

    //#region Label locators
    this.labelFirstName = '//label[@for="input-firstname"]'
    this.labelLastName = '//label[@for="input-lastname"]'
    this.labelEmail = '//label[@for="input-email"]'
    this.labelPhone = '//label[@for="input-telephone"]' 
    this.labelPassword = '//label[@for="input-password"]'
    this.labelPasswordConfirm = '//label[@for="input-confirm"]'
    this.labelNewsLetter = '//*[text()="Newsletter"]'
    this.labelSubscribe = '//*[text()="Subscribe"]'
    this.tltLabel = '//*[text()="{}"]'
    this.tltText = '//a[contains(text(),"{}")]'
    //#endregion

    //#region Link locators
    this.linkLogin =  '//a[contains(text(),"Login")]'
    this.linkRegister = '//a[contains(text(),"Register")]'
    this.linkForgottenPassword =  '//a[contains(text(),"Forgotten Password")]'
    this.linkMyAccount =  '//a[contains(text(),"My Account")]'
    this.linkAddressBook =  '//a[contains(text(),"Address Book")]'
    this.linkWishList =  '//a[contains(text(),"Wish List")]'
    this.linkOrderHistory =  '//a[contains(text(),"Order History")]'
    this.linkDownloads =  '//a[contains(text(),"Downloads")]'
    this.linkRecurringPayments =  '//a[contains(text(),"Recurring payments")]'
    this.linkRewardPoints =  '//a[contains(text(),"Reward Points")]'
    this.linkReturns =  '//a[contains(text(),"Returns")]'
    this.linkTransactions =  '//a[contains(text(),"Transactions")]'
    this.linkNewsletter =  '//a[contains(text(),"Newsletter")]'
    //#endregion

    this.firstName = '//input[@id="input-firstname"]'
    this.lastName = '//input[@id="input-lastname"]'
    this.email = '//input[@id="input-email"]'
    this.phone = '//input[@id="input-telephone"]'
    this.password = '//input[@id="input-password"]'
    this.passwordConfirm = '//input[@id="input-confirm"]'
    this.policy = '//label[@for="input-agree"]'
    this.privacyPolicyText = '//input[@name="agree"]/following-sibling::label | //label[contains(text(), "Privacy Policy")]'
  }

  async clickContinueBtn() {
    await this.page.click(this.continueBtn)
  }

  async getErrorMessage() {
    return await this.page.locator(this.messagePolicy)
  }

  async getAllErrorMessages() {
    const errorLocators = await this.page.locator('//div[@class="text-danger"]')
    return await errorLocators.allTextContents()
  }

  async getRegistrationSuccessMessage() {
    const successLocator = this.page.locator(this.messageSuccess)
    await successLocator.waitFor({ state: 'visible' })
    return await successLocator.textContent()
  }

  async getPasswordMismatchMessage() {
    const mismatchLocator = this.page.locator(this.messagePasswordMismatch)
    await mismatchLocator.waitFor({ state: 'visible' })
    return await mismatchLocator.textContent()
  }

  async register(firstName, lastName, email, phone, password, passwordConfirm) {
    await this.page.fill(this.firstName, firstName)
    await this.page.fill(this.lastName, lastName)
    await this.page.fill(this.email, email)
    await this.page.fill(this.phone, phone)
    await this.page.fill(this.password, password)
    await this.page.fill(this.passwordConfirm, passwordConfirm)
    await this.page.click(this.policy)
  }

  async leftLabelsVisible(labels) {
    // Check if all labels in the array are visible
    for (const label of labels) {
      const formattedLocator = this.tltLabel.replace('{}', label)
      const isVisible = await this.page.isVisible(formattedLocator)
      if (!isVisible) {
        return false
      }
    }
    return true
  }

  async rightLinksVisible(links) {
    const formattedLocator = this.tltText.replace('{}', links)
    //console.log(`Checking visibility of locator: ${formattedLocator}`)
    return await this.page.isVisible(formattedLocator)
  }

  async clickSubscribe(option) {
    const optionText = option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()
    const locator = `//label[contains(text(),"${optionText}")]`
    await this.page.click(locator)
  }

  async radioBtnChecked(option) {
    const value = option.toLowerCase() === 'yes' ? '1' : '0'
    const locator = `//input[@name="newsletter" and @value="${value}"]`
    return await this.page.locator(locator).isChecked()
  }

  async privacyPolicy() {
    const element = this.page.locator(this.privacyPolicyText).first()
    try {
      await element.waitFor({ state: 'visible', timeout: 3000 })
      const text = await element.textContent()
      return text.includes('Privacy Policy')
    } catch {
      return false
    }
  }
}

module.exports = { RegisterPage }