import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreservationComponent } from './preservation.component';

describe('PreservationComponent', () => {
  let component: PreservationComponent;
  let fixture: ComponentFixture<PreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
