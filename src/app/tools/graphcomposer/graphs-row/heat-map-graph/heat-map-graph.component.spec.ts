import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapGraphComponent } from './heat-map-graph.component';

describe('HeatMapGraphComponent', () => {
  let component: HeatMapGraphComponent;
  let fixture: ComponentFixture<HeatMapGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatMapGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
