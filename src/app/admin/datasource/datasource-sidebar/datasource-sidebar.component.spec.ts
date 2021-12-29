import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceSidebarComponent } from './datasource-sidebar.component';

describe('DatasourceSidebarComponent', () => {
  let component: DatasourceSidebarComponent;
  let fixture: ComponentFixture<DatasourceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
