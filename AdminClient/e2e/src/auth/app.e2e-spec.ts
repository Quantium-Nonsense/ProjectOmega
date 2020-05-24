import { browser, ExpectedConditions, logging } from 'protractor';
import { SuppliersPage } from '../suppliers/suppliers.po';
import { AuthPage } from './app.po';

describe('workspace-project App', () => {
  let authPage: AuthPage;
  let supplierPage: SuppliersPage;

  beforeEach(() => {
    authPage = new AuthPage();
    supplierPage = new SuppliersPage();
  });

  it('should display login screen and successfully logged in', async () => {
    await authPage.navigateTo();
    await authPage.inputLoginEmail();
    await authPage.inputLoginPassword();
    await authPage.clickLoginButton();

    const expectedConditions = ExpectedConditions;

    // Wait for http from angular
    browser.waitForAngular();

    const url = await browser.getCurrentUrl();
    expect(url.includes('dashboard')).toEqual(true);
  });

  it('should then navigate to suppliers', async () => {
    await supplierPage.navigateToFromDashboard();

    const url = await browser.getCurrentUrl();
    expect(url.includes('suppliers')).toEqual(true);
  });

  it('should then type in filter', () => {
    supplierPage.typeToFilter('Meow');
    browser.waitForAngular();

    expect(supplierPage.getAllTableRows().count).toBe(1);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
