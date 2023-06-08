import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilcComponent } from './profilc.component';

describe('ProfilcComponent', () => {
  let component: ProfilcComponent;
  let fixture: ComponentFixture<ProfilcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
