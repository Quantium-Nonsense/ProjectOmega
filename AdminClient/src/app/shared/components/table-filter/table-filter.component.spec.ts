import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';

import { TableFilterComponent } from './table-filter.component';

describe('TableFilterComponent', () => {
  let component: TableFilterComponent;
  let fixture: ComponentFixture<TableFilterComponent>;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilterComponent);
    component = fixture.componentInstance;

    component.action = () => false;
    component.dataSource = new MatTableDataSource<any>(['1', '2', 'TestSearchValue']);

    loader = TestbedHarnessEnvironment.loader(fixture);
    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
