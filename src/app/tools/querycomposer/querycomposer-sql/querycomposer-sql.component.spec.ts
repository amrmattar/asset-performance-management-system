import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerycomposerSqlComponent } from './querycomposer-sql.component';

describe('QuerycomposerSqlComponent', () => {
  let component: QuerycomposerSqlComponent;
  let fixture: ComponentFixture<QuerycomposerSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerycomposerSqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerycomposerSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
