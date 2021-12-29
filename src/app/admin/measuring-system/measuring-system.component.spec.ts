import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringSystemComponent } from './measuring-system.component';

describe('MeasuringSystemComponent', () => {
  let component: MeasuringSystemComponent;
  let fixture: ComponentFixture<MeasuringSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuringSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
