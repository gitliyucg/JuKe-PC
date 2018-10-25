import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponents } from './indexs.component';

describe('IndexComponent', () => {
  let component: IndexComponents;
  let fixture: ComponentFixture<IndexComponents>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
