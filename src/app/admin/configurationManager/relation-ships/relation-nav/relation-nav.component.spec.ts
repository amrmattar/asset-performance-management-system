import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationNavComponent } from './relation-nav.component';

describe('RelationNavComponent', () => {
  let component: RelationNavComponent;
  let fixture: ComponentFixture<RelationNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
