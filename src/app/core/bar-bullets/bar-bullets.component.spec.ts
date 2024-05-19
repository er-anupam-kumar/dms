import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarBulletsComponent } from './bar-bullets.component';

describe('BarBulletsComponent', () => {
  let component: BarBulletsComponent;
  let fixture: ComponentFixture<BarBulletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarBulletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
