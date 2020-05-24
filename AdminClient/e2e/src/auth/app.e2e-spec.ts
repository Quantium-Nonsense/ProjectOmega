import { browser, ExpectedConditions, logging } from 'protractor';
import { SupplierModel } from '../../../src/app/shared/model/supplier/supplier.model';
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

  it('should check the change was committed', async () => {
    supplierPage.clickOnFirstRowEdit();
    browser.waitForAngular();
    const dialog = await supplierPage.findDialog().isPresent();
    expect(dialog).toEqual(true);
    const text = 'I am the new cat!';
    browser.waitForAngular();
    const descText = await supplierPage.getFormDescription().getAttribute('value');
    expect(descText).toEqual(text);
  });

  it('should revert it back', async () => {
    const text = 'I am the old cat!';
    await supplierPage.setFormDescriptionText(text);
    browser.waitForAngular();
    const newText = await supplierPage.getFormDescription().getAttribute('value');
    expect(newText).toEqual(text);
    supplierPage.findDialogConfirmButton().click();
    browser.waitForAngular();
    // Expect dialog to be hidden
    const isDialogPresent: boolean = await supplierPage.findDialog().isPresent();
    expect(isDialogPresent).toEqual(false);
    await supplierPage.clearFilter();
    browser.waitForAngular();
  });

  it('should open new supplier dialog', async () => {
    await supplierPage.clickAddNewSupplierButton();
    browser.waitForAngular();
    const isDialogPresent = await supplierPage.findDialog().isPresent();
    expect(isDialogPresent).toEqual(true);
  });

  it('should populate form', async () => {
    const newSup: SupplierModel = {
      id: null,
      email: 'automated@supplier.com',
      companyName: 'Automation',
      contactNumber: '05050505005',
      description: 'Created from automated tests!',
      firstName: 'Automated',
      lastName: 'Test',
      notes: 'Hello i was a supplier created from automated e2e testing :), please be gentle!'
    };

    supplierPage.findDialogEmail().sendKeys(newSup.email);
    supplierPage.findDialogCompanyName().sendKeys(newSup.companyName);
    supplierPage.findDialogContactNumber().sendKeys(newSup.contactNumber);
    supplierPage.findDialogDescription().sendKeys(newSup.description);
    supplierPage.findDialogFirstName().sendKeys(newSup.firstName);
    supplierPage.findDialogLastName().sendKeys(newSup.lastName);
    supplierPage.findDialogNotes().sendKeys(newSup.notes);

    // Confirm form is valid now
    const button = supplierPage.findDialogConfirmButton();
    await button.click();
    browser.wait(ExpectedConditions.presenceOf(supplierPage.findSuccessSnackBar()), 5000, 'Couldnt find success snackbar :(');
  });

  it('should delete automation supplier', async () => {
    browser.waitForAngular();

    await supplierPage.typeToFilter('auto');
    const text = await supplierPage.getAllTableRows().first().getText();
    expect(text.toLowerCase().includes('auto')).toBe(true);
    browser.waitForAngular();
  });

  it('should delete automation supplier', async () => {
    const delButton = supplierPage.getDeleteButton().first();
    await delButton.click();
    browser.waitForAngular();
    const dialog = supplierPage.findDialog();
    const isPresent: boolean = await dialog.isPresent()
    expect(isPresent).toBe(true);
    const confirm = supplierPage.findDialogConfirmButton();
    await confirm.click();
    browser.wait(ExpectedConditions.presenceOf(supplierPage.findSuccessSnackBar()), 5000, 'Couldnt find success snackbar :(');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
