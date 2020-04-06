import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  dialogSelected: string;
  dialogGroup = new FormGroup({
    dialogControl1: new FormControl(''),
    dialogControl2: new FormControl(''),
    dialogControl3: new FormControl(''),
    dialogControl4: new FormControl(''),
    dialogControl5: new FormControl(''),
    dialogControl6: new FormControl(''),
    dialogControl7: new FormControl(''),
    dialogControl8: new FormControl(''),
    dialogControl9: new FormControl(''),
    dialogControl10: new FormControl(''),
    dialogControl11: new FormControl('')
  });

  @Input() data;

  constructor() {
    console.log('Default dialog selected: ' + this.dialogSelected);
  }

  ngOnInit() {
  }

  generate() {
  }

  save() {
  }

  close() {
  }

  displayLoad(): boolean {
    return this.data === 'load';
  }

  displayCreate(): boolean {
    return this.data === 'create';
  }

  displayUpdate(): boolean {
    return this.data === 'update';
  }

  displayDelete(): boolean {
    return this.data === 'delete';
  }
}
