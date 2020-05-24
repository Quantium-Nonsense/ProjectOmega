import { browser, by, element, ElementFinder, Key } from 'protractor';

export class AuthPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getLoginEmail(): ElementFinder {
    return element(by.id('formEmailInput'));
  }

  getLoginPassword(): ElementFinder {
    return element(by.id('formPasswordInput'));
  }

  async inputLoginPassword(): Promise<void> {
    await this.getLoginPassword().sendKeys('Nonsense');
  }

  async inputLoginEmail(): Promise<void> {
    await this.getLoginEmail().sendKeys('harryspitsillides@hotmail.com');
  }

  async clickLoginButton(): Promise<void> {
    await element(by.id('loginButton')).sendKeys(Key.ENTER);
  }

  async login(): Promise<void> {
    await this.inputLoginPassword();
    await this.inputLoginPassword();
    await this.clickLoginButton();
  }
}
