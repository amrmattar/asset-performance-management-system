import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGraphComponent } from './stock-graph.component';

describe('StockGraphComponent', () => {
  let component: StockGraphComponent;
  let fixture: ComponentFixture<StockGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
