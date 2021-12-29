import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatapermessionsComponent } from './datapermessions.component';

describe('DatapermessionsComponent', () => {
  let component: DatapermessionsComponent;
  let fixture: ComponentFixture<DatapermessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatapermessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatapermessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
