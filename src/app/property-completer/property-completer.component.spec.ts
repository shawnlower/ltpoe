import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCompleterComponent } from './property-completer.component';

describe('PropertyCompleterComponent', () => {
  let component: PropertyCompleterComponent;
  let fixture: ComponentFixture<PropertyCompleterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCompleterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCompleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
