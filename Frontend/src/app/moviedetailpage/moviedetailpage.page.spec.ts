import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviedetailpagePage } from './moviedetailpage.page';

describe('MoviedetailpagePage', () => {
  let component: MoviedetailpagePage;
  let fixture: ComponentFixture<MoviedetailpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedetailpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
