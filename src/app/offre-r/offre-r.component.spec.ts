import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreRComponent } from './offre-r.component';

describe('OffreRComponent', () => {
  let component: OffreRComponent;
  let fixture: ComponentFixture<OffreRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
