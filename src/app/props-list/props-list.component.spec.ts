import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsListComponent } from './props-list.component';

describe('PropsListComponent', () => {
  let component: PropsListComponent;
  let fixture: ComponentFixture<PropsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
