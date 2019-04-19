import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditorComponent } from './type-editor.component';

describe('TypeEditorComponent', () => {
  let component: TypeEditorComponent;
  let fixture: ComponentFixture<TypeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
