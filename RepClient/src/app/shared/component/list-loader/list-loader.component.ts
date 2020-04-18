import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ColorsEnum } from '../../model/colors.enum';
import { SpinnerStylesEnum } from '../../model/spinner-styles.enum';

@Component({
  selector: 'app-list-loader',
  templateUrl: './list-loader.component.html',
  styleUrls: ['./list-loader.component.scss']
})
export class ListLoaderComponent implements OnInit, AfterViewInit {
  spinners;
  /**
   * The style for what spinner should be presented
   * @default SpinnerStylesEnum.CRESCENT
   */
  @Input() spinnerStyle: SpinnerStylesEnum = SpinnerStylesEnum.CRESCENT;
  /**
   * The color of the spinner
   * @default ColorsEnum.PRIMARY
   */
  @Input() color: ColorsEnum = ColorsEnum.PRIMARY;

  /**
   * How many columns should the grid be split into
   * @default 2
   */
  @Input() columns = 2;

  /**
   * How many "loading" items should be on screen while loading
   * @default 10
   */
  @Input() noOfItems = 10;

  /**
   * Dummy items to display
   */
  private dummyItems: number[] = [];
  private calculatedCols: number;

  constructor() {
    this.spinners = SpinnerStylesEnum;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    for (let i = 0; i < this.noOfItems; i++) {
      this.dummyItems.push(i);
    }
    this.calculatedCols = 12 / this.columns;

  }
}
