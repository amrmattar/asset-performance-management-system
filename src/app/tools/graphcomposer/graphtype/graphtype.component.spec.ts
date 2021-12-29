import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphtypeComponent } from './graphtype.component';

describe('GraphtypeComponent', () => {
  let component: GraphtypeComponent;
  let fixture: ComponentFixture<GraphtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
