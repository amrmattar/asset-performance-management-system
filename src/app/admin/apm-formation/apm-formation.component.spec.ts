import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmFormationComponent } from './apm-formation.component';

describe('ApmFormationComponent', () => {
  let component: ApmFormationComponent;
  let fixture: ComponentFixture<ApmFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApmFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
