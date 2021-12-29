import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomMeasuringSystemsComponent } from './uom-measuring-systems.component';

describe('UomMeasuringSystemsComponent', () => {
  let component: UomMeasuringSystemsComponent;
  let fixture: ComponentFixture<UomMeasuringSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomMeasuringSystemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomMeasuringSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
