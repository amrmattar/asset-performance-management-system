import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerycomposerNavbarComponent } from './querycomposer-navbar.component';

describe('QuerycomposerNavbarComponent', () => {
  let component: QuerycomposerNavbarComponent;
  let fixture: ComponentFixture<QuerycomposerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerycomposerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerycomposerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
