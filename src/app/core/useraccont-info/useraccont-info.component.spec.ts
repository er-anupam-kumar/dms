import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccontInfoComponent } from './useraccont-info.component';

describe('UseraccontInfoComponent', () => {
  let component: UseraccontInfoComponent;
  let fixture: ComponentFixture<UseraccontInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraccontInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccontInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
