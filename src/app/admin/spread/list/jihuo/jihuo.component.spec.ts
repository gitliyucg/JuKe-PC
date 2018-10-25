import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JihuoComponent } from './jihuo.component';

describe('JihuoComponent', () => {
  let component: JihuoComponent;
  let fixture: ComponentFixture<JihuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JihuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JihuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
