import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGraphComponent } from './pie-graph.component';

describe('PieGraphComponent', () => {
  let component: PieGraphComponent;
  let fixture: ComponentFixture<PieGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
