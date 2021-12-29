import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLdabComponent } from './setting-ldab.component';

describe('SettingLdabComponent', () => {
  let component: SettingLdabComponent;
  let fixture: ComponentFixture<SettingLdabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingLdabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLdabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
