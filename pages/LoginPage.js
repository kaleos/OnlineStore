class LoginPage {
  constructor(page) {

    this.page = page
    this.emailAddress = '//input[@id="input-email"]'
    this.password = '//input[@id="input-password"]'
    this.loginBtn = '//input[@value="Login"]'
    this.continueBtn = '//*[text()="Continue"]'
    this.links = '//aside[@id="column-right"]'

    //#region Message locators
    this.messageInvalid = '//div[@class="alert alert-danger alert-dismissible"]'
    //#endregion

    //#region Label locators
    this.emailAddressLabel = '//*[text()="E-Mail Address"]'
    this.passwordLabel = '//*[text()="Password"]'
    //#endregion
  }
    
  async login(email, password) {
    await this.page.fill(this.emailAddress, email)
    await this.page.fill(this.password, password)
    await this.page.click(this.loginBtn)
  }

  async getErrorMessage() {
    return await this.page.locator(this.messageInvalid)
  }

  async clickContinueBtn() {
    await this.page.click(this.continueBtn)
  }

  async isLinksVisible(linkText) {
    const linkLocator = `${this.links}//*[normalize-space(text())="${linkText}"]`
    return await this.page.isVisible(linkLocator)
  }

  async emailPasswordLabel() {
    const isEmailLabelVisible = await this.page.isVisible(this.emailAddressLabel)
    const isPasswordLabelVisible = await this.page.isVisible(this.passwordLabel)
    return isEmailLabelVisible && isPasswordLabelVisible
  }

}

module.exports = { LoginPage }