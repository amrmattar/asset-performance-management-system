import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentDatapermissionComponent } from './main-content-datapermission.component';

describe('MainContentDatapermissionComponent', () => {
  let component: MainContentDatapermissionComponent;
  let fixture: ComponentFixture<MainContentDatapermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContentDatapermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentDatapermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
