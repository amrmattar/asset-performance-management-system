import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDataSheetComponent } from './info-data-sheet.component';

describe('InfoDataSheetComponent', () => {
  let component: InfoDataSheetComponent;
  let fixture: ComponentFixture<InfoDataSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDataSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
