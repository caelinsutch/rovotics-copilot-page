import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontsideComponent } from './frontside.component';

describe('FrontsideComponent', () => {
  let component: FrontsideComponent;
  let fixture: ComponentFixture<FrontsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
