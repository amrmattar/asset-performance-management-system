import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGeneralComponent } from './graph-general.component';

describe('GraphGeneralComponent', () => {
  let component: GraphGeneralComponent;
  let fixture: ComponentFixture<GraphGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
