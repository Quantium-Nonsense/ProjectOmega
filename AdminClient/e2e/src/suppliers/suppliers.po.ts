import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class SuppliersPage {
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

  async typeToFilter(text: string): Promise<void> {
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
