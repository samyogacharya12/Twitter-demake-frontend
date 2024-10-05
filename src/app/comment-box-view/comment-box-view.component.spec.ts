import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBoxViewComponent } from './comment-box-view.component';

describe('CommentBoxViewComponent', () => {
  let component: CommentBoxViewComponent;
  let fixture: ComponentFixture<CommentBoxViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentBoxViewComponent]
    });
    fixture = TestBed.createComponent(CommentBoxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
