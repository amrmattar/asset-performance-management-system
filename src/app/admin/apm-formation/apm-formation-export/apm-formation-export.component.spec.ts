import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmFormationExportComponent } from './apm-formation-export.component';

describe('ApmFormationExportComponent', () => {
  let component: ApmFormationExportComponent;
  let fixture: ComponentFixture<ApmFormationExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApmFormationExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmFormationExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
