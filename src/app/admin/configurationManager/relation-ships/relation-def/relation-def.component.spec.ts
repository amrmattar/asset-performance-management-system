import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationDefComponent } from './relation-def.component';

describe('RelationDefComponent', () => {
  let component: RelationDefComponent;
  let fixture: ComponentFixture<RelationDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
