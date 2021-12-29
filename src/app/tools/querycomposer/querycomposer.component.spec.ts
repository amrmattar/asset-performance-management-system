import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerycomposerComponent } from './querycomposer.component';

describe('QuerycomposerComponent', () => {
  let component: QuerycomposerComponent;
  let fixture: ComponentFixture<QuerycomposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerycomposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerycomposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
