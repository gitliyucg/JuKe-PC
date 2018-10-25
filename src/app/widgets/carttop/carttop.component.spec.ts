import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarttopComponent } from './carttop.component';

describe('CarttopComponent', () => {
  let component: CarttopComponent;
  let fixture: ComponentFixture<CarttopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarttopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarttopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
