import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCompleterComponent } from './item-completer.component';

describe('ItemCompleterComponent', () => {
  let component: ItemCompleterComponent;
  let fixture: ComponentFixture<ItemCompleterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCompleterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCompleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
