import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataSheetComponent } from './table-data-sheet.component';

describe('TableDataSheetComponent', () => {
  let component: TableDataSheetComponent;
  let fixture: ComponentFixture<TableDataSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
