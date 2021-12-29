import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordManagerContainerComponent } from './record-manager-container.component';

describe('RecordManagerContainerComponent', () => {
  let component: RecordManagerContainerComponent;
  let fixture: ComponentFixture<RecordManagerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordManagerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordManagerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
