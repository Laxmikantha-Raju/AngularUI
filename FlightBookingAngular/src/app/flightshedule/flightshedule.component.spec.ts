import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsheduleComponent } from './flightshedule.component';

describe('FlightsheduleComponent', () => {
  let component: FlightsheduleComponent;
  let fixture: ComponentFixture<FlightsheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
