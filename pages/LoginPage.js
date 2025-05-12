class LoginPage {
  constructor(page) {

    this.page = page
    this.emailAddress = '//input[@id="input-email"]'
    this.password = '//input[@id="input-password"]'
    this.loginBtn = '//input[@value="Login"]'

    //#region Message locators
    this.messageInvalid = '//div[@class="alert alert-danger alert-dismissible"]'
    //
  }
    
  async login(email, password) {
    await this.page.fill(this.emailAddress, email)
    await this.page.fill(this.password, password)
    await this.page.click(this.loginBtn)
  }

  async getErrorMessage() {
    return await this.page.locator(this.messageInvalid)
  }

}

module.exports = { LoginPage }