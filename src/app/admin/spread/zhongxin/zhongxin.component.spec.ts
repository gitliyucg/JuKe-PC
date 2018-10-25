import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhongxinComponent } from './zhongxin.component';

describe('ZhongxinComponent', () => {
  let component: ZhongxinComponent;
  let fixture: ComponentFixture<ZhongxinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhongxinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhongxinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
