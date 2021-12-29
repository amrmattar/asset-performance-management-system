import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLdabComponent } from './sidebar-ldab.component';

describe('SidebarLdabComponent', () => {
  let component: SidebarLdabComponent;
  let fixture: ComponentFixture<SidebarLdabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarLdabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLdabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
