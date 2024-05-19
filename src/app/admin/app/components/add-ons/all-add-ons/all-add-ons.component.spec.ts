import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAddOnsComponent } from './all-add-ons.component';

describe('AllAddOnsComponent', () => {
  let component: AllAddOnsComponent;
  let fixture: ComponentFixture<AllAddOnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAddOnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAddOnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
