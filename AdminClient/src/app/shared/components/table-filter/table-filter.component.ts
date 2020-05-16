import { Component, DoCheck, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements DoCheck {
  /**
   * Label for input field
   *
   * @default 'Filter'
   */
  @Input() label = 'Filter';

  /**
   * The datasource on where the filter should be applied
   * additionally if loadingTime is set to 'DATA' this will be used
   * to ensure a table exists
   */
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  /**
   * How should the form label be displayed
   */
  @Input() appearance: 'fill' | 'outline' | 'standard' = 'fill';

  private setDataSource: MatTableDataSource<any>;

  /**
   * A filter input for mat Table the predicate function takes by default an all lower case value of the input
   */
  constructor() {
  }

  /**
   * The predicate on how to filter the rows
   * The function must return a boolean
   *
   * @returns boolean
   */
  @Input() action: <T>(data: T, filterValue: string) => boolean = () => false;

  ngDoCheck(): void {
    if (this.setDataSource !== this.dataSource) {
      this.setDataSource = this.dataSource;
      this.dataSource.filterPredicate = (data, value) => this.action(data, value);
    }
  }

  lookup(value: Event) {
    const filterValue = (value.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
