import { AfterContentInit, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements AfterContentInit {
  /**
   * The predicate on how to filter the rows
   * The function must return a boolean
   */
  @Input() action: <T>(data: T, filterValue: string) => boolean;

  /**
   * The datasource on where the filter should be applied
   * additionally if loadingTime is set to 'DATA' this will be used
   * to ensure a table exists
   */
  @Input() dataSource: MatTableDataSource<any>;

  /**
   * A filter input for mat Table the predicate function takes by default an all lower case value of the input
   */
  constructor() {
  }

  ngAfterContentInit(): void {
    if (!this.dataSource) {
      console.warn('It appears you have initialized this component with out an initialized Data source');
      throw new Error('DataSource not initialized!');
    }
    this.dataSource.filterPredicate = (data, filter) => this.action(data, filter);
  }

  lookup(value: Event) {
    const filterValue = (value.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
