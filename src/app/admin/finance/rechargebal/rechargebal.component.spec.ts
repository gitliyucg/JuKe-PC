import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargebalComponent } from './rechargebal.component';

describe('RechargebalComponent', () => {
  let component: RechargebalComponent;
  let fixture: ComponentFixture<RechargebalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargebalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargebalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
