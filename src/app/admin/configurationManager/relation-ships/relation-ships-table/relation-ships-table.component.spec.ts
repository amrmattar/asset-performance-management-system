import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationShipsTableComponent } from './relation-ships-table.component';

describe('RelationShipsTableComponent', () => {
  let component: RelationShipsTableComponent;
  let fixture: ComponentFixture<RelationShipsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationShipsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationShipsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
