import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheCComponent } from './fiche-c.component';

describe('FicheCComponent', () => {
  let component: FicheCComponent;
  let fixture: ComponentFixture<FicheCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
