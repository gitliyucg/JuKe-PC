import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenpeiComponent } from './fenpei.component';

describe('FenpeiComponent', () => {
  let component: FenpeiComponent;
  let fixture: ComponentFixture<FenpeiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenpeiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenpeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
