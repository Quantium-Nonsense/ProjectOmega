import { Key, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class SuppliersPage {
  findSuccessSnackBar(): ElementFinder {
    return element(by.css('.successSnack'));
  }

  findDialogForm(): ElementFinder {
    return this.findDialog().element(by.css('suppliersForm'));
  }

  findDialogEmail(): ElementFinder {
    return this.findDialog().element(by.id('formEmailInput'));
  }

  findDialogCompanyName(): ElementFinder {
    return this.findDialog().element(by.id('formCompanyName'));
  }

  findDialogContactNumber(): ElementFinder {
    return this.findDialog().element(by.id('formCompany'));
  }

  findDialogDescription(): ElementFinder {
    return this.findDialog().element(by.id('formDescription'));
  }

  findDialogFirstName(): ElementFinder {
    return this.findDialog().element(by.id('formFirstName'));
  }

  findDialogLastName(): ElementFinder {
    return this.findDialog().element(by.id('formLastName'));
  }

  findDialogNotes(): ElementFinder {
    return this.findDialog().element(by.id('formNotes'));
  }

  findDialogConfirmButton(): ElementFinder {
    return this.findDialog().element(by.partialButtonText('Confirm'));
  }

  getSuppliersButton(): ElementFinder {
    return element(by.id('suppliers'));
  }

  async clickButton(button: ElementFinder): Promise<void> {
    await button.click();
  }

  async navigateToFromDashboard(): Promise<void> {
    await this.clickButton(this.getSuppliersButton());
  }

  getFilter(): ElementFinder {
    return element(by.id('filterTableInput'));
  }

  async clearFilter(): Promise<void> {
    const field = this.getFilter();
    field.sendKeys(Key.chord(Key.CONTROL, 'a'));
    field.sendKeys(Key.BACK_SPACE);
    field.clear();
  }

  async typeToFilter(text: string): Promise<void> {
    await this.getFilter().clear();
    await this.getFilter().sendKeys(text);
  }

  getAllTableRows(): ElementArrayFinder {
    return element.all(by.css('.mat-row'));
  }

  getFormDescription() {
    return element(by.id('formDescription'));
  }

  async setFormDescriptionText(text: string): Promise<void> {
    const desc = this.getFormDescription();
    await desc.clear();
    await desc.sendKeys(text);
  }

  async clickAddNewSupplierButton(): Promise<void> {
    await element(by.css('button[aria-label="New Product"]')).click();
  }

  getDeleteButton(): ElementArrayFinder {
    return this.getAllTableRows().all(by.css('.deleteSupplier'));
  }

  getAllEditButtons(): ElementArrayFinder {
    const rows: ElementArrayFinder = this.getAllTableRows().all(by.css('.mat-icon-button'));
    return rows;
  }

  async getEmailInputText(): Promise<string> {
    return element(by.id('formEmailInput')).getText();
  }

  findDialog(): ElementFinder {
    return element(by.css('.mat-dialog-container'));
  }

  clickOnFirstRowEdit() {
    const row = this.getAllTableRows().first();
    row.all(by.css('.mat-icon-button')).first().click();
  }
}
