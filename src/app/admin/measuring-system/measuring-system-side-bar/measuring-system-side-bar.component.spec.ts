import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringSystemSideBarComponent } from './measuring-system-side-bar.component';

describe('MeasuringSystemSideBarComponent', () => {
  let component: MeasuringSystemSideBarComponent;
  let fixture: ComponentFixture<MeasuringSystemSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuringSystemSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringSystemSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
