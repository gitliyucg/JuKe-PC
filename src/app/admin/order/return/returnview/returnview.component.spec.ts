import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnviewComponent } from './returnview.component';

describe('ReturnviewComponent', () => {
  let component: ReturnviewComponent;
  let fixture: ComponentFixture<ReturnviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
