import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationShipsComponent } from './relation-ships.component';

describe('RelationShipsComponent', () => {
  let component: RelationShipsComponent;
  let fixture: ComponentFixture<RelationShipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationShipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
