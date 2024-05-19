import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentsComponent } from './create-departments.component';

describe('CreateDepartmentsComponent', () => {
  let component: CreateDepartmentsComponent;
  let fixture: ComponentFixture<CreateDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
