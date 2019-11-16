import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalPidComponent } from './vertical-pid.component';

describe('VerticalPidComponent', () => {
  let component: VerticalPidComponent;
  let fixture: ComponentFixture<VerticalPidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalPidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalPidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
