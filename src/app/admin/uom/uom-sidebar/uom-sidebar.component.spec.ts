import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomSidebarComponent } from './uom-sidebar.component';

describe('UomSidebarComponent', () => {
  let component: UomSidebarComponent;
  let fixture: ComponentFixture<UomSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
