import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremieumcComponent } from './premieumc.component';

describe('PremieumcComponent', () => {
  let component: PremieumcComponent;
  let fixture: ComponentFixture<PremieumcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremieumcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremieumcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
