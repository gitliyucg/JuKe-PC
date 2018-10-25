import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutouComponent } from './futou.component';

describe('FutouComponent', () => {
  let component: FutouComponent;
  let fixture: ComponentFixture<FutouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
