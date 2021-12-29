import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnGraphComponent } from './column-graph.component';

describe('ColumnGraphComponent', () => {
  let component: ColumnGraphComponent;
  let fixture: ComponentFixture<ColumnGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
