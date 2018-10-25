import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnviewComponent } from './annview.component';

describe('AnnviewComponent', () => {
  let component: AnnviewComponent;
  let fixture: ComponentFixture<AnnviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
