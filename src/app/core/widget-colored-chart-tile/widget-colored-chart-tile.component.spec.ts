import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetColoredChartTileComponent } from './widget-colored-chart-tile.component';

describe('WidgetColoredChartTileComponent', () => {
  let component: WidgetColoredChartTileComponent;
  let fixture: ComponentFixture<WidgetColoredChartTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetColoredChartTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetColoredChartTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
