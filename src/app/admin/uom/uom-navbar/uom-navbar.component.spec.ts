import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomNavbarComponent } from './uom-navbar.component';

describe('UomNavbarComponent', () => {
  let component: UomNavbarComponent;
  let fixture: ComponentFixture<UomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
