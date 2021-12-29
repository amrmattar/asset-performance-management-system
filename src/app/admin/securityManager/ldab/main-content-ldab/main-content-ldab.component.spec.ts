import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentLdabComponent } from './main-content-ldab.component';

describe('MainContentLdabComponent', () => {
  let component: MainContentLdabComponent;
  let fixture: ComponentFixture<MainContentLdabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContentLdabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentLdabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
