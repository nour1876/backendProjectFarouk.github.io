import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrerComponent } from './offrer.component';

describe('OffrerComponent', () => {
  let component: OffrerComponent;
  let fixture: ComponentFixture<OffrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffrerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
