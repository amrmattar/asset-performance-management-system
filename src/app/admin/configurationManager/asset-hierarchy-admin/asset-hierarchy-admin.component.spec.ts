import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHierarchyAdminComponent } from './asset-hierarchy-admin.component';

describe('AssetHierarchyAdminComponent', () => {
  let component: AssetHierarchyAdminComponent;
  let fixture: ComponentFixture<AssetHierarchyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetHierarchyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetHierarchyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
