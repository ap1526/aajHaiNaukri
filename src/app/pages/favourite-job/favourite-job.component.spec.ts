import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteJobComponent } from './favourite-job.component';

describe('FavouriteJobComponent', () => {
  let component: FavouriteJobComponent;
  let fixture: ComponentFixture<FavouriteJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
