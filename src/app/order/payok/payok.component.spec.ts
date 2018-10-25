import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayokComponent } from './payok.component';

describe('PayokComponent', () => {
  let component: PayokComponent;
  let fixture: ComponentFixture<PayokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
