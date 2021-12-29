import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPermissionComponent } from './side-bar-permission.component';

describe('SideBarPermissionComponent', () => {
  let component: SideBarPermissionComponent;
  let fixture: ComponentFixture<SideBarPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
