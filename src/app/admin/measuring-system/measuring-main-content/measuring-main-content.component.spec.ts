import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringMainContentComponent } from './measuring-main-content.component';

describe('MeasuringMainContentComponent', () => {
  let component: MeasuringMainContentComponent;
  let fixture: ComponentFixture<MeasuringMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuringMainContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
