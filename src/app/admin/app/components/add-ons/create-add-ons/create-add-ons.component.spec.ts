import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddOnsComponent } from './create-add-ons.component';

describe('CreateAddOnsComponent', () => {
  let component: CreateAddOnsComponent;
  let fixture: ComponentFixture<CreateAddOnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAddOnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddOnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
