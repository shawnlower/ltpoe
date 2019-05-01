import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewItemComponent } from './dialog-new-item.component';

describe('DialogNewItemComponent', () => {
  let component: DialogNewItemComponent;
  let fixture: ComponentFixture<DialogNewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
