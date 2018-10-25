import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErweimaComponent } from './erweima.component';

describe('ErweimaComponent', () => {
  let component: ErweimaComponent;
  let fixture: ComponentFixture<ErweimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErweimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErweimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
