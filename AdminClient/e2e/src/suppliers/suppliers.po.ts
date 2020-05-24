import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class SuppliersPage {
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
    return element.all(by.css('.mat-row'))
  }
}
