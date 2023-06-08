import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrerComponent } from './parametrer.component';

describe('ParametrerComponent', () => {
  let component: ParametrerComponent;
  let fixture: ComponentFixture<ParametrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
