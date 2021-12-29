import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectionDataSheetComponent } from './edit-section-data-sheet.component';

describe('EditSectionDataSheetComponent', () => {
  let component: EditSectionDataSheetComponent;
  let fixture: ComponentFixture<EditSectionDataSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSectionDataSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSectionDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
