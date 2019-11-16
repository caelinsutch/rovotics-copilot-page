import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPidComponent } from './horizontal-pid.component';

describe('HorizontalPidComponent', () => {
  let component: HorizontalPidComponent;
  let fixture: ComponentFixture<HorizontalPidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalPidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalPidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
