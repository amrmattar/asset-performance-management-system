import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedualJopDetailsComponent } from './schedual-jop-details.component';

describe('SchedualJopDetailsComponent', () => {
  let component: SchedualJopDetailsComponent;
  let fixture: ComponentFixture<SchedualJopDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedualJopDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedualJopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
