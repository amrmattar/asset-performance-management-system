import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphcomposerComponent } from './graphcomposer.component';

describe('GraphcomposerComponent', () => {
  let component: GraphcomposerComponent;
  let fixture: ComponentFixture<GraphcomposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphcomposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphcomposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
