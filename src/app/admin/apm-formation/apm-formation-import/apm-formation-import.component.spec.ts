import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmFormationImportComponent } from './apm-formation-import.component';

describe('ApmFormationImportComponent', () => {
  let component: ApmFormationImportComponent;
  let fixture: ComponentFixture<ApmFormationImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApmFormationImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmFormationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
