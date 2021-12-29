import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationInfoComponent } from './relation-info.component';

describe('RelationInfoComponent', () => {
  let component: RelationInfoComponent;
  let fixture: ComponentFixture<RelationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
