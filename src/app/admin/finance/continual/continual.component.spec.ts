import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinualComponent } from './continual.component';

describe('ContinualComponent', () => {
  let component: ContinualComponent;
  let fixture: ComponentFixture<ContinualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
