import {ThemePalette} from '@angular/material/core';
import {Observable} from 'rxjs';

export class PopupDialogDataModel {
  constructor(
    public title: string,
    public description: string,
    public dialogActions: {text: string, action: () => void, color?: ThemePalette}[],
    public isDisabled?:  Observable<boolean> | boolean
  ) {
  }
}
