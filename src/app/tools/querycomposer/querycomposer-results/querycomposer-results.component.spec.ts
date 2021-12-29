import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerycomposerResultsComponent } from './querycomposer-results.component';

describe('QuerycomposerResultsComponent', () => {
  let component: QuerycomposerResultsComponent;
  let fixture: ComponentFixture<QuerycomposerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerycomposerResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerycomposerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
