import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceMaincontentComponent } from './datasource-maincontent.component';

describe('DatasourceMaincontentComponent', () => {
  let component: DatasourceMaincontentComponent;
  let fixture: ComponentFixture<DatasourceMaincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceMaincontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceMaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
