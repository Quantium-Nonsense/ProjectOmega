import { ThemePalette } from '@angular/material/core';

export class PopupDialogDataModel {
  constructor(
    public title: string,
    public description: string,
    public dialogActions: {text: string, action: () => void, color?: ThemePalette}[],
    public isDisabled: boolean = false
  ) {
  }
}
