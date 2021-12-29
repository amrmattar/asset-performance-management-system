import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerycomposerDesignComponent } from './querycomposer-design.component';

describe('QuerycomposerDesignComponent', () => {
  let component: QuerycomposerDesignComponent;
  let fixture: ComponentFixture<QuerycomposerDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerycomposerDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerycomposerDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
