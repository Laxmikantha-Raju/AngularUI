import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightshedulelistComponent } from './flightshedulelist.component';

describe('FlightshedulelistComponent', () => {
  let component: FlightshedulelistComponent;
  let fixture: ComponentFixture<FlightshedulelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightshedulelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightshedulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
