import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostrComponent } from './postr.component';

describe('PostrComponent', () => {
  let component: PostrComponent;
  let fixture: ComponentFixture<PostrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
