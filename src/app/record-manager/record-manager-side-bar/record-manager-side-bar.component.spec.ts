import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordManagerSideBarComponent } from './record-manager-side-bar.component';

describe('RecordManagerSideBarComponent', () => {
  let component: RecordManagerSideBarComponent;
  let fixture: ComponentFixture<RecordManagerSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordManagerSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordManagerSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
