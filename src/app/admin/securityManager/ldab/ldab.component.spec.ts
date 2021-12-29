import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdabComponent } from './ldab.component';

describe('LdabComponent', () => {
  let component: LdabComponent;
  let fixture: ComponentFixture<LdabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LdabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
