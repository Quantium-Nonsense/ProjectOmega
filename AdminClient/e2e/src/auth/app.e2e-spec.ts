import { browser, logging } from 'protractor';
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

  it('should then type in filter', async () => {
    await supplierPage.typeToFilter('Meow');
    browser.waitForAngular();
    const text = await supplierPage.getAllTableRows().first().getText();
    expect(text.toLowerCase().includes('meow')).toBe(true);
  });

  it('should then open edit menu of company', async () => {
    supplierPage.clickOnFirstRowEdit();
    browser.waitForAngular();
    const dialog = await supplierPage.findDialog().isPresent();
    expect(dialog).toBe(true);
  });

  it('should then change the description', async () => {
    const text = 'I am the new cat!';
    await supplierPage.setFormDescriptionText(text);
    browser.waitForAngular();
    const newText = await supplierPage.getFormDescription().getAttribute('value');
    expect(newText).toEqual(text);
  });

  it('should then comit the change', async () => {
      supplierPage.findDialogConfirmButton().click();
      browser.waitForAngular();
      // Expect dialog to be hidden
      const isDialogPresent: boolean = await supplierPage.findDialog().isPresent();
      expect(isDialogPresent).toEqual(false);
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
