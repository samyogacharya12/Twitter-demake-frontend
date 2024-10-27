import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileModalComponent } from './editprofile-modal.component';

describe('EditprofileModalComponent', () => {
  let component: EditprofileModalComponent;
  let fixture: ComponentFixture<EditprofileModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprofileModalComponent]
    });
    fixture = TestBed.createComponent(EditprofileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
