import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMComponent } from './uom.component';

describe('UOMComponent', () => {
  let component: UOMComponent;
  let fixture: ComponentFixture<UOMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UOMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UOMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
