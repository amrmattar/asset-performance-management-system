import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomMeasuringUnitsComponent } from './uom-measuring-units.component';

describe('UomMeasuringUnitsComponent', () => {
  let component: UomMeasuringUnitsComponent;
  let fixture: ComponentFixture<UomMeasuringUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomMeasuringUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomMeasuringUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
