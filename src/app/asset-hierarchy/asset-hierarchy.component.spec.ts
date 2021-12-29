import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHierarchyComponent } from './asset-hierarchy.component';

describe('AssetHierarchyComponent', () => {
  let component: AssetHierarchyComponent;
  let fixture: ComponentFixture<AssetHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
