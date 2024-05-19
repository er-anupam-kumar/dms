import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlansComponent } from './edit-plans.component';

describe('EditPlansComponent', () => {
  let component: EditPlansComponent;
  let fixture: ComponentFixture<EditPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
