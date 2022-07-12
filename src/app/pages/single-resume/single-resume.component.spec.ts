import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleResumeComponent } from './single-resume.component';

describe('SingleResumeComponent', () => {
  let component: SingleResumeComponent;
  let fixture: ComponentFixture<SingleResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
