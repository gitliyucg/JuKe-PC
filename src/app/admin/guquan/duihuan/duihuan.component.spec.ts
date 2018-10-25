import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuihuanComponent } from './duihuan.component';

describe('DuihuanComponent', () => {
  let component: DuihuanComponent;
  let fixture: ComponentFixture<DuihuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuihuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuihuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
